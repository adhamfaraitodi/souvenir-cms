<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Delivery;
use App\Models\OfficeAddress;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        $cacheKey = 'snap_token:' . $request->order_code;
        if (Cache::has($cacheKey)) {
            $snapToken = Cache::get($cacheKey);
        } else {
            $snapToken = $this->generateSnapToken($request);
            Cache::put($cacheKey, $snapToken, now()->addHours(1));
        }

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
            'gross'=>'required',
            'note'=>'nullable|max:1000',
            'origin'=>'required',
            'destination'=>'required',
        ]);
        $order = Order::where('id', $request->order_id)->first();
        if ($order) {
            $order->update([
                'qty' => $request->quantity,
                'delivery_fee' => $request->shipping_cost,
                'total_price' => ($order->product_price * $request->quantity) + $request->shipping_cost,
                'note'=>$request->note,
            ]);
            $originData = $this->getFormattedOfficeAddress($request->origin);
            $destinationData = $this->getFormattedAddress($request->destination);
            Delivery::updateOrCreate(
                ['order_id' => $order->id],
                [
                    'courier_name' => $request->courier,
                    'shipping_status' => 'pending',
                    'origin'=>$originData,
                    'origin_name'=>'PT. Indah', //hardcode dulu nanti dinamik pakai admin name or record for office information
                    'destination'=>$destinationData,
                    'destination_name'=>$request->customer_name,
                ]
            );
        } else {
            throw new \Exception('Order not found');
        }
    }
    private function getFormattedAddress($addressId)
    {
        $address = Address::with('city.province')->find($addressId)->first();
        if (!$address) {
            throw new \Exception('Address not found');
        }
        return "{$address->street_address}, {$address->city->city_name}, {$address->city->province->province_name} - {$address->postal_code}";
    }
    private function getFormattedOfficeAddress($addressId)
    {
        $address = OfficeAddress::with('city.province')->find($addressId)->first();
        if (!$address) {
            throw new \Exception('Address not found');
        }
        return "{$address->street_address}, {$address->city->city_name}, {$address->city->province->province_name} - {$address->postal_code}";
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
        $orderCode = $request->query('order_code');
        $cacheKey = 'snap_token:' . $orderCode;
        $snapToken = Cache::get($cacheKey);

        if (!$snapToken) {
            return redirect()->route('user.orders.list')->with('error', 'Your payment session has expired. Please start a new payment.');
        }

        return inertia('User/Payment/Index', [
            'snapToken' => $snapToken,
        ]);
    }
}
