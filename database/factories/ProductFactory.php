<?php

namespace Database\Factories;

use App\Models\Admin;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

class ProductFactory extends Factory
{
    protected $model = Product::class;
    public function definition():array
    {
        $type = $this->faker->randomElement(['retail', 'custom']);
        $for = ($type === 'retail') ? 'all' : User::inRandomOrder()->first()->id;
        return [
            'admin_id' => Admin::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'name' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 1, 150),
            'product_image' => 'storage/photos/' . $this->faker->uuid . '.svg',
            'weight' => $this->faker->numberBetween(1, 1000),
            'package' => $this->faker->randomElement(['Box Kayu', 'Box Suede', 'Box Vynil','Box Bludru','Box Karton']),
            'type' => $type,
            'for' => $for,
            'stock' => $this->faker->numberBetween(0, 100),
            'specification' => $this->faker->paragraph,
            'brand' => $this->faker->word,
            'created_at' => now(),
            'updated_at' => now(),
            ];
    }
}
