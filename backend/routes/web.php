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
Route::get('/{any}', function ($any = null) {
    if ($any && File::exists(public_path("frontend/$any"))) {
        return File::get(public_path("frontend/$any"));
    }

    return File::get(public_path('frontend/index.html'));
})->where('any', '.*');