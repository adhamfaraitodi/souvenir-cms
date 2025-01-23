<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'created_at',
        'updated_at'
    ];

    public function products()
    {
        return $this->hasOne(Product::class, 'category_id');
    }
}
