<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPage extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'landingpage_url',
        'html_url',
        'css_url',
        'created_at',
        'updated_at',
    ];

    public function orders()
    {
        return $this->hasOne(Order::class, 'landingpage_id');
    }
}
