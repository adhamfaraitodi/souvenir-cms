<?php

namespace Database\Factories;

use App\Models\ProductOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductOrderFactory extends Factory
{
    protected $model = ProductOrder::class;
    public function definition()
    {
        return [
            'product_id' => \App\Models\Product::factory(),
            'order_id'=>\App\Models\Order::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
