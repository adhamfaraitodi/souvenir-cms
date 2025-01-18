<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return Inertia::render('User/Order/Index', ['orders' => $orders]);
    }
    public function create()
    {
        return Inertia::render('User/Order/Id/Add');
    }
    public function store(Request $request)
    {

    }
    public function show(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return redirect()->route('user.orders.index')->with('error', 'Order not found.');
        }
        return Inertia::render('User/Order/Id/Index', ['order' => $order]);
    }
    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, string $id)
    {
        //
    }
    public function destroy(string $id)
    {
        //
    }
}
