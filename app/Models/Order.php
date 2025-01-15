<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'landingpage_id',
        'delivery_id',
        'company_profile',
        'description',
        'payment_status',
        'payment_date',
        'order_status',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function landingPage()
    {
        return $this->belongsTo(LandingPage::class, 'landingpage_id');
    }

    public function delivery()
    {
        return $this->belongsTo(Delivery::class, 'delivery_id');
    }

    public function products()
    {
        return $this->hasMany(ProductOrder::class, 'order_id');
    }
}
