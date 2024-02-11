<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/booking-mail', function () {  //test route for email styling

    $data = [
        'first_name' => 'John',
        'time_slot' => '10:00 AM',
        'date' => '2024-02-09',
        'pin'  => '73841a',
    ];

    $stringData = implode(', ', $data);
    
    return view('emails.bookingMail', ['data' => $data]);
});

// Serve the frontend HTML at the root URL ("/")
Route::get('/{any}', function () {
    return view('frontend'); // Ensure this is the entry point view of your SPA
})->where('any', '.*'); // This captures all routes



