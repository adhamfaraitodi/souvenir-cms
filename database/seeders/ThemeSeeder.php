<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Theme::create([
            'title' => 'blank',
            'html_code' => '<div id="gjs"></div>',
            'css_code' => 'body { margin: 0; }',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
