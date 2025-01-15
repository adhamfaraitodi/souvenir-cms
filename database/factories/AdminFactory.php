<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;
class AdminFactory extends Factory
{
    protected $model = Admin::class;
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'username' => $this->faker->userName,
            'password' => bcrypt('password'),
            'email' => $this->faker->unique()->safeEmail,
            'role' => $this->faker->randomElement(['pemilik', 'karyawan']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
