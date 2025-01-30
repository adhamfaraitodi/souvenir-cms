<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }
    public function createPayment(Request $request)
    {
        $this->validateAndUpdateOrder($request);
        $snapToken = $this->generateSnapToken($request);
        return response()->json(['snap_token' => $snapToken]);
    }

    private function validateAndUpdateOrder(Request $request)
    {
        $request->validate([
            'order_id'=>'required',
            'order_code' => 'required',
            'customer_name' => 'required',
            'customer_email' => 'required',
            'quantity' => 'required',
            'shipping_cost' => 'required',
            'courier' => 'required',
            'gross'=>'required'
        ]);
        $order = Order::where('id', $request->order_id)->first();
        if ($order) {
            $order->update([
                'qty' => $request->quantity,
                'delivery_fee' => $request->shipping_cost,
                'total_price' => ($order->product_price * $request->quantity) + $request->shipping_cost,
            ]);
            Delivery::updateOrCreate(
                ['order_id' => $order->id],
                [
                    'courier_name' => $request->courier,
                    'tracking_number' => 'jneselalu',
                    'shipping_status' => 'shipped'
                ]
            );
        } else {
            throw new \Exception('Order not found');
        }
    }

    private function generateSnapToken(Request $request)
    {
        $transactionDetails = [
            'order_id' => $request->order_code,
            'gross_amount' => $request->gross,
        ];
        $customerDetails = [
            'first_name' => $request->customer_name,
            'email' => $request->customer_email,
        ];
        $payload = [
            'transaction_details' => $transactionDetails,
            'customer_details' => $customerDetails,
        ];
        try {
            $snapToken = Snap::getSnapToken($payload);
            return $snapToken;
        } catch (\Exception $e) {
            throw new \Exception("Failed to generate Snap token: " . $e->getMessage());
        }
    }
    public function show(Request $request)
    {
        $snapToken = $request->query('snap_token');
        return inertia('User/Payment/Index', [
            'snapToken' => $snapToken,
        ]);
    }
}
