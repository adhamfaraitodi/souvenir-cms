<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    protected $table = 'users';
    protected $fillable = [
        'admin_id',
        'username',
        'password',
        'name',
        'email',
        'phone',
        'role',
        'created_at',
        'updated_at',
        'remember_token'

    ];
    protected $hidden = [
        'password', 'remember_token'
    ];
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }
    public function addresses()
    {
        return $this->hasMany(Address::class, 'user_id');
    }
    public function getAuthIdentifierName()
    {
        return 'username';
    }
}
