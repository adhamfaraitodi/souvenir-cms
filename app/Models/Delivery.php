<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    protected $table = 'deliveries';
    protected $primaryKey = 'delivery_id';
    protected $fillable = [
        'name',
        'shipping_cost',
        'shipping_date',
        'box',
        'tracking_code',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'delivery_id');
    }
}
