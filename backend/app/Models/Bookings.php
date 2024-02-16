<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;


class Bookings extends Model
{

    
    
    use HasFactory;
    protected $fillable = ['date', 'time_slot', 'tables_needed', 'pin', 'party_size',
    'first_name', 'last_name', 'email', 'phone_number',];

    public static function isSlotAvailable($date, $timeSlot, $tablesNeeded)
    {
        $totalBookedTables = self::where('date', $date)
                                ->where('time_slot', $timeSlot)
                                ->sum('tables_needed');
                               

        $totalTables = 10;
        return ($totalBookedTables + $tablesNeeded) <= $totalTables;
    }

    public static function fetchUpdateInfo($pin){
        
        $updateInfo = self::where('pin', $pin)->first(['date', 'party_size', 'time_slot', 'first_name']);

        return $updateInfo;
    }

    public static function deleteBooking($pin){

     $booking = self::where('pin', $pin)->first();

    // If a booking is found, delete it
    if ($booking) {
        $booking->delete();
        return true; // Return true to indicate success
    }

    // Return false if no booking was found with the given pin
    return false;
   
    }

    public static function updateBooking($changedInfo, $pin){
        $booking = self::where('pin', $pin)->first();
    
        // If a booking is found, update it with new information
        if ($booking) {
            $booking->update([
                'tables_needed' => $changedInfo['tables_needed'],
                'time_slot' => $changedInfo['time_slot'],
                'date' => $changedInfo['date'],
                'party_size' => $changedInfo['party_size'],
            ]);
            return true; // Return true to indicate success
        }
    
        // Return false if no booking was found with the given pin
        return false;
    }

}