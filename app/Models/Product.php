<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'admin_id',
        'category_id',
        'name',
        'price',
        'product_image',
        'weight',
        'package',
        'type',
        'for',
        'stock',
        'specification',
        'brand',
        'created_at',
        'updated_at',
    ];
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function order()
    {
        return $this->hasOne(Order::class, 'product_id');
    }
}
