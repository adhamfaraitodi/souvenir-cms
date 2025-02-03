<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            ['id' => 1, 'province_name' => 'Bali'],
            ['id' => 2, 'province_name' => 'Bangka Belitung'],
            ['id' => 3, 'province_name' => 'Banten'],
            ['id' => 4, 'province_name' => 'Bengkulu'],
            ['id' => 5, 'province_name' => 'DI Yogyakarta'],
            ['id' => 6, 'province_name' => 'DKI Jakarta'],
            ['id' => 7, 'province_name' => 'Gorontalo'],
            ['id' => 8, 'province_name' => 'Jambi'],
            ['id' => 9, 'province_name' => 'Jawa Barat'],
            ['id' => 10, 'province_name' => 'Jawa Tengah'],
            ['id' => 11, 'province_name' => 'Jawa Timur'],
            ['id' => 12, 'province_name' => 'Kalimantan Barat'],
            ['id' => 13, 'province_name' => 'Kalimantan Selatan'],
            ['id' => 14, 'province_name' => 'Kalimantan Tengah'],
            ['id' => 15, 'province_name' => 'Kalimantan Timur'],
            ['id' => 16, 'province_name' => 'Kalimantan Utara'],
            ['id' => 17, 'province_name' => 'Kepulauan Riau'],
            ['id' => 18, 'province_name' => 'Lampung'],
            ['id' => 19, 'province_name' => 'Maluku'],
            ['id' => 20, 'province_name' => 'Maluku Utara'],
            ['id' => 21, 'province_name' => 'Nanggroe Aceh Darussalam (NAD)'],
            ['id' => 22, 'province_name' => 'Nusa Tenggara Barat (NTB)'],
            ['id' => 23, 'province_name' => 'Nusa Tenggara Timur (NTT)'],
            ['id' => 24, 'province_name' => 'Papua'],
            ['id' => 25, 'province_name' => 'Papua Barat'],
            ['id' => 26, 'province_name' => 'Riau'],
            ['id' => 27, 'province_name' => 'Sulawesi Barat'],
            ['id' => 28, 'province_name' => 'Sulawesi Selatan'],
            ['id' => 29, 'province_name' => 'Sulawesi Tengah'],
            ['id' => 30, 'province_name' => 'Sulawesi Tenggara'],
            ['id' => 31, 'province_name' => 'Sulawesi Utara'],
            ['id' => 32, 'province_name' => 'Sumatera Barat'],
            ['id' => 33, 'province_name' => 'Sumatera Selatan'],
            ['id' => 34, 'province_name' => 'Sumatera Utara'],
        ];
        foreach ($provinces as $province) {
            Province::create([
                'id'=>$province['id'],
                'province_name'=>$province['province_name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
