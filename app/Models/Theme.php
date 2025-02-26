<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;
    protected $table = 'themes';
    protected $fillable = [
        'tittle',
        'html_code',
        'css_code',
        'for',
        'created_at',
        'updated_at'
    ];

    public function LandingPage()
    {
        return $this->hasOne(LandingPage::class, 'theme_id');
    }
}
