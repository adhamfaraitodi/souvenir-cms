<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $request->validate([
            'order_id' => 'required',
            'gross_amount' => 'required',
        ]);

        $transactionDetails = [
            'order_id' => $request->order_id,
            'gross_amount' => $request->gross_amount,
        ];
        $customerDetails = [
            'first_name' => Auth::user()->name,
            'email' => Auth::user()->email,
            'phone' => Auth::user()->phone,
        ];
        $itemDetails = [
            [
                'id' => $request->order_id,
                'price' => $request->amount,
                'quantity' => 1,
                'name' => $request->product_name,
            ],
        ];
        $payload = [
            'transaction_details' => $transactionDetails,
            'customer_details' => $customerDetails,
            'item_details' => $itemDetails,
        ];
        try {
            $snapToken = Snap::getSnapToken($payload);
            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function show(Request $request)
    {
        return inertia('Payment', [
            'snap_token' => $request->snap_token
        ]);
    }
}
