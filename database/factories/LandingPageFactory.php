<?php

namespace Database\Factories;

use App\Models\LandingPage;
use Illuminate\Database\Eloquent\Factories\Factory;

class LandingPageFactory extends Factory
{
    protected $model = LandingPage::class;
    public function definition()
    {
        return [
            'tittle'            => $this->faker->sentence(3),
            'description'      => $this->faker->paragraph(),
            'landingpage_url'  => $this->faker->url(),
            'html_url'         => 'storage/html/' . $this->faker->uuid . '.html',
            'css_url'          => 'storage/css/' . $this->faker->uuid . '.css',
            'created_at'       => now(),
            'updated_at'       => now(),
        ];
    }
}
