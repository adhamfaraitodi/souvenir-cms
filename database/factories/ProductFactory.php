<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

class ProductFactory extends Factory
{
    protected $model = Product::class;
    public function definition()
    {
        return [
            'admin_id' => \App\Models\Admin::factory(),
            'category_id' => \App\Models\Category::factory(),
            'product_detail_id' => \App\Models\ProductDetail::factory(),
            'name' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 1, 100),
            'stock' => $this->faker->numberBetween(0, 100),
            'created_at' => now(),
            'updated_at' => now(),
            ];
    }
}
