<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPage extends Model
{
    use HasFactory;
    protected $table = 'landing_pages';
    protected $fillable = [
        'title',
        'landing_page_url',
        'html_url',
        'css_url',
        'created_at',
        'updated_at',
    ];

    public function orders()
    {
        return $this->hasOne(Order::class, 'landing_page_id');
    }
}
