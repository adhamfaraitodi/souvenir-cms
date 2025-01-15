<?php

namespace Database\Factories;

use App\Models\Delivery;
use Illuminate\Database\Eloquent\Factories\Factory;

class DeliveryFactory extends Factory
{
    protected $model = Delivery::class;
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['JNE', 'JNT']),
            'shipping_cost' => $this->faker->randomFloat(2, 1, 100),
            'shipping_date' =>$this->faker->dateTimeBetween('-1 month', 'now'),
            'box'=> $this->faker->randomElement(['yes','no']),
            'tracking_code'=>$this->faker->regexify('[A-Za-z0-9]{15}'),
            'created_at' => now(),
            'updated_at' => now(),
            ];
    }
}
