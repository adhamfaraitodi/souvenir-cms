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
        'province_name',
        'city_id',
        'city_name',
        'postal_code',
        'street_address',
        'changed_by',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'changed_by' => 'string',
    ];
}
