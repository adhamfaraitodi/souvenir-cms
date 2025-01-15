<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'password',
        'email',
        'role'
    ];
    public function products()
    {
        return $this->hasMany(Product::class,'admin_id');
    }
}
