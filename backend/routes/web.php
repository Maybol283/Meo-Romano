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
    return File::get(public_path('frontend/index.html'));
});

// Serve CSS and JS assets from the assets folder
Route::get('assets/{file}', function ($file) {
    $filePath = public_path("frontend/assets/$file");

    if (File::exists($filePath)) {
        $fileContents = File::get($filePath);
        $contentType = mime_content_type($filePath);

        return response($fileContents)
            ->header('Content-Type', $contentType);
    }

    // Handle 404 for assets that do not exist
    abort(404);
})->where('file', '.*');



Route::get('/booking-mail', function () {

    $data = [
        'first_name' => 'John',
        'time_slot' => '10:00 AM',
        'date' => '2024-02-09'
    ];

    $stringData = implode(', ', $data);
    
    return view('emails.bookingMail', ['data' => $data]);
});