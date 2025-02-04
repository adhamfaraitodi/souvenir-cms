<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'product_id',
        'landing_page_id',
        'order_code',
        'company_profile',
        'note',
        'order_status',
        'qty',
        'product_price',
        'delivery_fee',
        'total_price',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }

    public function landingpage()
    {
        return $this->belongsTo(Landingpage::class,'landing_page_id');
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class, 'order_id', 'id');
    }
    public function payment()
    {
        return $this->hasOne(Payment::class,'payment_id');
    }
}
