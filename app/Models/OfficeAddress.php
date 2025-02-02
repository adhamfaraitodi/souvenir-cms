<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficeAddress extends Model
{
    use HasFactory;
    protected $table = 'office_addresses';
    protected $fillable = [
        'province_id',
        'city_id',
        'postal_code',
        'street_address',
        'changed_by',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'changed_by' => 'string',
    ];
    public function City()
    {
        return $this->belongsTo(City::class,'city_id');
    }
    public function Province()
    {
        return $this->belongsTo(Province::class,'province_id');
    }
}
