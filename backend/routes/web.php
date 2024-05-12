<?php

use Illuminate\Support\Facades\Route;
use App\Mail\MyTestEmail;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Serve the frontend HTML at the root URL ("/")
Route::get('/{any}', function () {
    return view('frontend'); // Ensure this is the entry point view of your SPA
})->where('any', '.*'); // This captures all routes
