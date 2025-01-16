<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;
    public function definition(): array
    {
        return [
            'admin_id' => \App\Models\Admin::factory(),
            'username' => $this->faker->userName,
            'password' => bcrypt('password'),
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->numerify('+62###########'),
            'role' => $this->faker->randomElement(['user']),
            'created_at' => now(),
            'updated_at' => now(),
            ];
    }
}
