<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\OfficeAddress;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::user()->id)->get();
        return Inertia::render('User/Order/Index', ['orders' => $orders]);
    }
    public function show(string $id) //order detail later will be changed route to orders/detail/{id}
    {
        $order = Order::find($id);
        if (!$order) {
            return redirect()->route('user.orders.index')->with('error', 'Order not found.');
        }
        return Inertia::render('User/Order/Id/Index', ['order' => $order]);
    }
    public function create(Request $request,$product_id)
    {
        $product = Product::findOrFail($product_id);
        $orderCode = $this->generateUniqueOrderId();
        $user = User::where('id', Auth::user()->id)->first();
        $order = Order::create([
            'order_code' => $orderCode,
            'user_id' => $user->id,
            'product_id' => $product->id,
            'landing_page_id' => null,
            'order_status'=>"pending",
        ]);
        return redirect()->route('user.orders.edit', $order->order_code);
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
        $order = Order::where('order_code', $orderCode)
            ->with('product', 'user.addresses')
            ->first();

        if (!$order) {
            return redirect()->route('orders.index')->with('error', 'Order not found.');
        }
        $addresses = $order->user->addresses;
        $officeAddress = OfficeAddress::first();
        $data = [
            'order' => [
                'id' => $order->order_id,
                'order_code'=>$order->order_code,
                'order_status'=>$order->order_status,
                'product' => [
                    'id' => $order->product->product_id,
                    'name' => $order->product->name,
                    'type' => $order->product->type,
                    'category' => $order->product->category->name,
                    'price' => $order->product->price,
                    'image' => $order->product->product_image,
                    'weight' => $order->product->weight,
                    'package' => $order->product->package,
                ],
            ],
            'addresses' => $addresses->map(function ($address) {
                return [
                    'id' => $address->id,
                    'user_id' => $address->user_id,
                    'province_id' => $address->province_id,
                    'province_name' => $address->province_name,
                    'city_id' => $address->city_id,
                    'city_name' => $address->city_name,
                    'postal_code' => $address->postal_code,
                    'street_address' => $address->street_address,
                ];
            }),
            'officeAddress' =>[
                'city_id' => $officeAddress->city_id,
            ],
        ];

        return Inertia::render('User/Order/Id/Index', $data);
    }
}
