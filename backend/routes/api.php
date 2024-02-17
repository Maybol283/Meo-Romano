<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/reservations/query', [ReservationController::class, 'getTimeSlot'])->name('reservations.query');

Route::post('reservations/store', [ReservationController::class, 'storeBooking'])->name('reservations.store');

Route::get('/update-manager/get', [ReservationController::class, 'getUpdateInfo'])->name('booking.getUpdateInfo');

Route::delete('/update-manager/delete', [ReservationController::class, 'deleteBooking'])->name('booking.delete');

Route::patch('/update-manager/update', [ReservationController::class, 'updateBooking'])->name('booking.update');

Route::get('/booking-manager/getAll', [ReservationController::class, 'getAllBookingInfo'])->name('booking.getAllInfo');