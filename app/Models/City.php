<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $table = 'cities';
    protected $fillable = [
        'city_name',
        'created_at',
        'updated_at'
    ];

    public function address()
    {
        return $this->hasOne(Address::class, 'city_id');
    }
    public function OfficeAddress()
    {
        return $this->hasOne(OfficeAddress::class, 'city_id');
    }
}
