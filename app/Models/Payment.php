<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'order_code',
        'transaction_id',
        'transaction_status',
        'payment_type',
        'gross_amount',
        'transaction_time',
        'settlement_time',
        'response_json',
        'va_number',
        'bank',
        'created_at',
        'updated_at',
    ];
    public function order()
    {
        return $this->belongsTo(Order::class,'order_id');
    }
}
