<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->user()->isAdmin) { // Assuming you have an isAdmin attribute or method
            // Redirect or respond with unauthorized
            return redirect('/sign-in'); // Adjust as needed
        }

        return $next($request);
    }
}
