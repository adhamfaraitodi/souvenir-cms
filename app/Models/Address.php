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
        'city_id',
        'postal_code',
        'street_address',
        'created_at',
        'updated_at'
    ];
    public function City()
    {
        return $this->belongsTo(City::class,'city_id');
    }
}
