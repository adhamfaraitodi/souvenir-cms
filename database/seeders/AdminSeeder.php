<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::create([
            'name' => 'Admin',
            'username' => 'admin',
            'password' => bcrypt('password'),
            'email' => 'admin@example.com',
            'role' => 'admin',
            'remember_token' =>'null',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
