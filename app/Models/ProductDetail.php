<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'specification',
        'brand',
        'sticker_image',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'product_detail_id');
    }
}
