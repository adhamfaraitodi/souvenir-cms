<?php

namespace Database\Factories;

use App\Models\ProductDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductDetailFactory extends Factory
{
    protected $model = ProductDetail::class;
    public function definition(): array
    {
        return [
            'specification' => $this->faker->text,
            'brand' => $this->faker->word,
            'sticker_image' => $this->faker->imageUrl,
            'created_at' => now(),
            'updated_at' => now(),
            ];
    }
}
