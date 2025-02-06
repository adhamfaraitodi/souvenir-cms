<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MidtransController extends Controller
{
    private function validateWebhookRequest(Request $request)
    {
        return $request->validate([
            'order_id'           => 'required|string',
            'transaction_id'     => 'required|string',
            'transaction_status' => 'required|string',
            'transaction_time'   => 'required|date',
            'settlement_time'    => 'nullable|date',
            'payment_type'       => 'required|string',
            'gross_amount'       => 'required|numeric',
            'signature_key'      => 'required|string',
            'status_code'        => 'required|string',
            'va_numbers'         => 'sometimes|array',
            'va_numbers.*.va_number' => 'sometimes|string',
            'va_numbers.*.bank'  => 'sometimes|string',
        ]);
    }

    private function extractWebhookData(Request $request)
    {
        return [
            'order_code' => $request->input('order_id'),
            'transaction_id' => $request->input('transaction_id'),
            'transaction_status' => $request->input('transaction_status'),
            'transaction_time' => $request->input('transaction_time'),
            'settlement_time' => $request->input('settlement_time'),
            'payment_type' => $request->input('payment_type'),
            'gross_amount' => $request->input('gross_amount'),
            'signature_key' => $request->input('signature_key'),
            'status_code' => $request->input('status_code'),
            'va_number' => $request->input('va_numbers.0.va_number', null),
            'bank' => $request->input('va_numbers.0.bank', null),
        ];
    }

    private function verifySignature(string $order_code, string $status_code, string $gross_amount, string $signature_key): bool
    {
        $serverKey = config('services.midtrans.server_key');
        $expected_signature = hash('sha512', $order_code . $status_code . $gross_amount . $serverKey);

        return $signature_key === $expected_signature;
    }

    private function findOrder(string $order_code): ?Order
    {
        return Order::where('order_code', $order_code)->first();
    }

    private function isPaymentProcessed(string $transaction_id): bool
    {
        return Payment::where('transaction_id', $transaction_id)->exists();
    }

    private function createPayment(Order $order, array $data): Payment
    {
        return Payment::create([
            'order_id'           => $order->id,
            'order_code'         => $data['order_code'],
            'transaction_id'     => $data['transaction_id'],
            'transaction_status' => $data['transaction_status'],
            'transaction_time'   => $data['transaction_time'],
            'settlement_time'    => $data['settlement_time'],
            'payment_type'       => $data['payment_type'],
            'gross_amount'       => $data['gross_amount'],
            'response_json'      => json_encode($data['response_json']),
            'va_number'          => $data['va_number'],
            'bank'               => $data['bank'],
        ]);
    }

    private function updateOrderStatus(Order $order, string $transaction_status): void
    {
        $statusMap = [
            'settlement' => 'paid',
            'deny' => 'canceled',
            'cancel' => 'canceled',
            'expire' => 'canceled',
            'pending' => 'pending',
        ];

        if (isset($statusMap[$transaction_status])) {
            $order->update(['order_status' => $statusMap[$transaction_status]]);
        }
    }
    private function handleLandingPageCreation(Order $order, string $transaction_status): void
    {
        if ($transaction_status !== 'settlement') {
            return;
        }
        $theme = Theme::find(1);
        if (!$theme) {
            Log::error('Default theme not found for landing page creation', [
                'order_code' => $order->order_code
            ]);
            return;
        }
        $landingPageCode = $this->generateUniqueLandingPageCode();
        $landingPageUrl = $this->generateUniqueLandingPageUrl();
        $landingPage = Landingpage::create([
            'theme_id' => 1,
            'title' => 'Untitled',
            'landing_page_code' => $landingPageCode,
            'url'=>$landingPageUrl,
            'html_code' => $theme->html_code,
            'css_code' => $theme->css_code,
        ]);
        $order->update([
            'landing_page_id' => $landingPage->id
        ]);
    }

    private function generateUniqueLandingPageCode(): string
    {
        $maxAttempts = 5;
        $attempt = 0;

        do {
            if ($attempt >= $maxAttempts) {
                throw new \Exception('Unable to generate unique landing page code after ' . $maxAttempts . ' attempts');
            }
            $randomString = Str::random(10);
            $exists = Landingpage::where('landing_page_code', $randomString)->exists();
            $attempt++;
        } while ($exists);

        return $randomString;
    }
    private function generateUniqueLandingPageUrl(): string
    {
        $maxAttempts = 5;
        $attempt = 0;

        do {
            if ($attempt >= $maxAttempts) {
                throw new \Exception('Unable to generate unique landing page URL after ' . $maxAttempts . ' attempts');
            }
            $randomString = Str::random(17);
            $exists = Landingpage::where('url', $randomString)->exists();
            $attempt++;
        } while ($exists);

        return $randomString;
    }

    public function getWebhook(Request $request)
    {
        try {
            $validated = $this->validateWebhookRequest($request);
            $data = $this->extractWebhookData($request);
            $data['response_json'] = $request->all();
            if (!$this->verifySignature(
                $data['order_code'],
                $data['status_code'],
                $data['gross_amount'],
                $data['signature_key']
            )) {
                Log::warning('Invalid Midtrans signature', [
                    'order_code' => $data['order_code'],
                    'transaction_id' => $data['transaction_id']
                ]);
                return response()->json(['message' => 'Invalid signature key'], 403);
            }
            if ($this->isPaymentProcessed($data['transaction_id'])) {
                return response()->json(['message' => 'Payment already processed'], 200);
            }
            $order = $this->findOrder($data['order_code']);
            if (!$order) {
                Log::error('Order not found in Midtrans webhook', [
                    'order_code' => $data['order_code'],
                    'transaction_id' => $data['transaction_id']
                ]);
                return response()->json(['message' => 'Order not found'], 404);
            }
            $payment = $this->createPayment($order, $data);
            $this->updateOrderStatus($order, $data['transaction_status']);
            $this->handleLandingPageCreation($order, $data['transaction_status']);
            return response()->json(['message' => 'Webhook processed successfully'], 200);

        } catch (\Exception $e) {
            Log::error('Midtrans webhook failed', [
                'error' => $e->getMessage(),
                'order_code' => $data['order_code'] ?? null,
                'transaction_id' => $data['transaction_id'] ?? null,
                'payload' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Webhook processing failed'], 500);
        }
    }
}
