<?php

namespace Database\Seeders;

use App\Models\OfficeAddress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeAddressSeeder extends Seeder
{
    public function run()
    {
        OfficeAddress::create([
            'city_id' => '5',
            'postal_code' => '55111',
            'street_address' => 'Jl. Kebun Raya No.2, Rejowinangun',
            'changed_by' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
