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
    protected $fillable = [
        'username',
        'password',
        'name',
        'email',
        'phone',
    ];
    protected $hidden = [
        'password',
    ];
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }
}
