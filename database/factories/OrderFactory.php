<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'landingpage_id' => \App\Models\Landingpage::factory(),
            'delivery_id' => \App\Models\Delivery::factory(),
            'company_profile' => $this->faker->company,
            'description' => $this->faker->text,
            'payment_date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'payment_status' => $this->faker->randomElement(['pending', 'success', 'failed', 'canceled', 'deny']),
            'order_status' => $this->faker->randomElement(['pending', 'paid', 'processing', 'shipped', 'delivered', 'completed', 'canceled', 'failed', 'refunded', 'on_hold']),
            'created_at' => now(),
            'updated_at' => now(),
            ];
    }
}
