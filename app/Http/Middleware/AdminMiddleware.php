<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::guard('admin')->check()){
            if(Auth::guard('admin')->user()->role==='admin'){
                return $next($request);
            }
            abort(403, 'Unauthorized');
        }
        return redirect()->route('admin.login');
    }
}
