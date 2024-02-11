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
// Serve the frontend HTML at the root URL ("/")
Route::get('/', function () {
    return view('frontend'); // Assuming you have a 'welcome.blade.php' in your resources/views directory
});


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