<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Content extends Model
{
    use HasFactory;

    protected $fillable = [
        'landing_page_id',
        'text',
        'image_path',
    ];
    public function landingpage()
    {
        return $this->belongsTo(LandingPage::class, 'lading_page_id');
    }
}
