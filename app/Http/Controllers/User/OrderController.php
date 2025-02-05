<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\OfficeAddress;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::user()->id)->get();
        return Inertia::render('User/Order/Index', ['orders' => $orders]);
    }
    public function show(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return redirect()->route('user.orders.index')->with('error', 'Order not found.');
        }
        return Inertia::render('User/Order/Id/Index', ['order' => $order]);
    }
    public function create(Request $request, $product_id)
    {
        $request->validate([
            'qty' => 'required|integer|min:1',
        ]);

        try {
            $product = Product::findOrFail($product_id);
            $orderCode = $this->generateUniqueOrderId();
            $user = Auth::user();
            $qty = $request->qty;
            $total = $qty * $product->price;
            DB::beginTransaction();

            $order = Order::create([
                'order_code' => $orderCode,
                'user_id' => $user->id,
                'product_id' => $product->id,
                'landing_page_id' => null,
                'qty' => $qty,
                'product_price' => $product->price,
                'total_price' => $total,
                'order_status' => "pending",
            ]);

            DB::commit();

            return redirect()->route('user.orders.edit', $order->order_code);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to create order. Please try again.']);
        }
    }

    private function generateUniqueOrderId(): string
    {
        do {
            $orderCode = 'order-' . Str::random(8);
        } while (Order::where('order_code', $orderCode)->exists());
        return $orderCode;
    }

    public function edit(string $orderCode)
    {
        $order = Order::with(['product.category', 'user.addresses.city.province', 'delivery'])->where('order_code', $orderCode)->firstOrFail();
        $user = $order->user;
        $addresses = $user->addresses;
        $officeAddress = OfficeAddress::with('city.province')->first();
        $delivery = $order->delivery;
        $data = [
            'user' => collect($user)->only(['name', 'email', 'phone']),
            'order' => [
                'id' => $order->id,
                'order_code' => $order->order_code,
                'order_status' => $order->order_status,
                'qty' => $order->qty,
                'price' => $order->product_price,
                'product' => collect($order->product)->only(['product_id', 'name', 'type', 'weight', 'package'])
                    ->merge([
                        'category' => $order->product->category->name,
                        'image' => $order->product->product_image,
                    ]),
                'delivery' => $delivery ? [
                    'courier_name' => $delivery->courier_name,
                    'tracking_number' => $delivery->tracking_number,
                    'shipping_status' => $delivery->shipping_status,
                    'origin' => $delivery->origin,
                    'origin_name' => $delivery->origin_name,
                    'destination' => $delivery->destination,
                    'destination_name' => $delivery->destination_name,
                ] : null,
            ],
            'addresses' => $addresses->map(fn($address) => [
                'id' => $address->id,
                'province_name' => optional($address->city->province)->province_name,
                'city_id' => $address->city_id,
                'city_name' => optional($address->city)->city_name,
                'postal_code' => $address->postal_code,
                'street_address' => $address->street_address,
            ]),
            'officeAddress' => [
                'id' => $officeAddress->id,
                'province_name' => optional($officeAddress->city->province)->province_name,
                'city_id' => $officeAddress->city_id,
                'city_name' => optional($officeAddress->city)->city_name,
                'postal_code' => $officeAddress->postal_code,
                'street_address' => $officeAddress->street_address,
            ],
            'couriers' => $this->getCouriers(),
        ];
        return Inertia::render('User/Order/Id/Index', $data);
    }
    private function getCouriers()
    {
        return [
            ['value' => 'jne', 'label' => 'JNE'],
            ['value' => 'pos', 'label' => 'POS Indonesia'],
            ['value' => 'sap', 'label' => 'SAP Express'],
            ['value' => 'jnt', 'label' => 'J&T Express'],
            ['value' => 'ninja', 'label' => 'Ninja Express'],
        ];
    }

}
