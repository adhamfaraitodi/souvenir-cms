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
    protected $primaryKey = 'admin_id';
    protected $fillable = [
        'username',
        'password',
        'email',
        'role'
    ];
    protected $hidden = [
        'password',
    ];
        /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];
    public function products()
    {
        return $this->hasMany(Product::class,'admin_id');
    }
    public function getAuthIdentifierName()
    {
        return 'username';
    }
}
