<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPageReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'landing_page_id',
        'reason',
        'description',
        'ip_address'
    ];
    public function landingpage()
    {
        return $this->belongsTo(LandingPage::class, 'lading_page_id');
    }
}
