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
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'username',
        'password',
        'name',
        'email',
        'phone',
        'role',
    ];
    protected $hidden = [
        'password',
    ];
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }
    public function getAuthIdentifierName()
    {
        return 'username';
    }
}
