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
            'province_id' => '501',
            'province_name' => 'DI Yogyakarta',
            'city_id' => '5',
            'city_name' => 'Yogyakarta',
            'postal_code' => '55111',
            'street_address' => 'Jl. Kebun Raya No.2, Rejowinangun',
            'changed_by' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
