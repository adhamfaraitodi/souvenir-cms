<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::guard('web')->check()){
            if(Auth::guard('web')->user()->role==='user'){
                return $next($request);
            }
            abort(403, 'Unauthorized');
        }
        return redirect()->route('login');
    }
}
