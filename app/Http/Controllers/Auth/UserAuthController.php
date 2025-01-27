<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/User/Login');
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);
        $remember = $request->has('remember');
        if (Auth::guard('web')->attempt($credentials,$remember)) {
            $request->session()->regenerate();
            return redirect()->route('user.products.index');
        }
        return redirect("login")->withErrors(['username' => 'username or password is incorrect']);
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect("login");
    }
}
