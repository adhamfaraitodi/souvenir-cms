<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('User/Product/Index', [
            'customProducts' => Product::where('type', 'custom')
                ->where('for', $user->id)
                ->get(),
            'retailProducts' => Product::where('type', 'retail')->get(),
        ]);
    }
    public function show(string $id)
    {
        $products = Product::with('category')->find($id);
        if (!$products) {
            return redirect()->route('user.products.index')->with('error', 'Product not found.');
        }
        return Inertia::render('User/Product/Id/Index', ['product' => $products]);
    }
}
