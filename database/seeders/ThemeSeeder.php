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
        $theme=[
            [ "title"=>'Default',"html_code" => ' <div class="gjs-row gjs-hero">
            <div class="gjs-cell"><img id="logo" src="" alt="Company Logo"></div>
            <div class="gjs-cell"><h1 id="company_name"></h1></div>
            <div class="gjs-cell"><img id="hero_image" src="" alt="Hero Image"></div>
        </div>
        <div class="gjs-row">
            <div class="gjs-cell"><h2 id="headtitle"></h2></div>
            <div class="gjs-cell"><p id="subtitle"></p></div>
        </div>
        <div class="gjs-row gjs-content-section">
            <div class="gjs-cell gjs-content-box">
                <img id="content_image_1" src="" alt="Content Image 1">
                <p id="content_1"></p>
            </div>
            <div class="gjs-cell gjs-content-box">
                <img id="content_image_2" src="" alt="Content Image 2">
                <p id="content_2"></p>
            </div>
            <div class="gjs-cell gjs-content-box">
                <img id="content_image_3" src="" alt="Content Image 3">
                <p id="content_3"></p>
            </div>
            <div class="gjs-cell gjs-content-box">
                <img id="content_image_4" src="" alt="Content Image 4">
                <p id="content_4"></p>
            </div>
            <div class="gjs-cell gjs-content-box">
                <img id="content_image_5" src="" alt="Content Image 5">
                <p id="content_5"></p>
            </div>
        </div>
        <div class="gjs-row gjs-gallery">
            <div class="gjs-cell"><img id="gallery_1" src="" alt="Gallery Image 1"></div>
            <div class="gjs-cell"><img id="gallery_2" src="" alt="Gallery Image 2"></div>
            <div class="gjs-cell"><img id="gallery_3" src="" alt="Gallery Image 3"></div>
        </div>', "css_code" => 'body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .gjs-container {
            width: 80%;
            margin: auto;
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .gjs-hero img {
            max-width: 100%;
            height: auto;
        }
        .gjs-content-section {
            margin-top: 20px;
        }
        .gjs-content-box {
            background: #fff;
            padding: 10px;
            margin: 10px 0;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .gjs-content-box img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto 10px;
        }
        .gjs-gallery {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        .gjs-gallery img {
            width: 100px;
            height: auto;
            border-radius: 5px;
        }',"for"=>1],
            [ "title"=>'Blank',"html_code" => '<div id="gjs"></div>', "css_code" => 'body { margin: 0; }',"for"=>2],
        ];
        foreach ($theme as $data) {
            Theme::create([
                'title'=>$data['title'],
                'html_code'=>$data['html_code'],
                'css_code'=>$data['css_code'],
                'for'=>$data['for'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
