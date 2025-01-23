<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    protected $table = 'admins';
    protected $fillable = [
        'username',
        'password',
        'name',
        'email',
        'role',
        'created_at',
        'updated_at',
        'remember_token'
    ];
    protected $hidden = [
        'password','remember_token'
    ];
    protected $casts = [
        'password' => 'hashed',
    ];
    public function products()
    {
        return $this->hasMany(Product::class,'admin_id');
    }
    public function users()
    {
        return $this->hasMany(User::class,'admin_id');
    }
    public function getAuthIdentifierName()
    {
        return 'username';
    }
}
