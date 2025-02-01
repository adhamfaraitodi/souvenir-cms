<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(){
        $data = User::with('addresses')
            ->where('id',Auth::user()->id)
            ->first();
        return Inertia::render('User/Account/Profile', ['user'=>$data,'addresses' => $data ? $data->addresses : []]);
    }
}
