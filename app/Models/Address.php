<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table = 'addresses';
    protected $fillable = [
        'user_id',
        'province_id',
        'province_name',
        'city_id',
        'city_name',
        'postal_code',
        'street_address',
        'created_at',
        'updated_at'
    ];
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
