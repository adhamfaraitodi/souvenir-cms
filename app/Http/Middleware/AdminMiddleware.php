<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next,string $role): Response
    {
        if(Auth::check()){
            if(Auth::user()->role==$role){
                return $next($request);
            }
            abort(403);
        }
        return redirect('admin.login');
    }
}
