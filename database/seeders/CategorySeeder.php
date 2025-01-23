<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Souvenir Miniatur Logam',
            'Souvenir Miniatur Helm',
            'Souvenir Miniatur Akrilik',
            'Souvenir Miniatur Akrilik Logam',
            'Trophy Award Logam',
            'Trophy Award Resin Chrome',
            'Trophy Award Logam Resin',
            'Trophy Award Aluminium',
            'Plakat Kayu Cor 3D',
            'Plakat Kayu Logam Welding',
            'Plakat Kayu Akrilik',
            'Plakat Kayu Basic',
            'Plakat Kayu Logam',
            'Plakat Kayu Resin',
            'Frame Kayu Semi Miniatur',
            'Frame Kayu Cor 3D',
            'Frame Kayu Logam',
            'Frame Aluminium Akrilik Logam',
            'Plakat Akrilik Logam',
            'Plakat Akrilik Resin',
            'Plakat Akrilik Basic',
            'Plakat Akrilik Stiker',
            'Plakat Kristal UV',
            'Plakat Kristal Laser',
            'Plakat Resin Logam',
            'Plakat Resin Basic',
            'Tongkat Rektor / Pedel',
            'Kalung Rektor Cor',
            'Kalung Rektor Drig',
            'Samir Wisuda Drig',
            'Kalung Rektor Esta',
            'Samir Wisuda UV',
            'Pin 3D',
            'Pin Etsa',
            'Pin Akrilik',
            'Pin Plastik',
            'Medali 3D',
            'Medali Etsa',
            'Medali UV',
            'Medali Stiker',
            'Payung',
            'Pulpen',
            'Flashdisk',
            'Tumbler',
            'Mug',
            'Kaos',
            'Topi',
            'Power Bank',
            'Gantungan Kunci',
            'Kalender',
            'Lanyard',
        ];
        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
