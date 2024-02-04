<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class ReservationController extends Controller
{
    public function queryReservations(Request $request)
    {
        // Access the data sent from the front-end
        $date = $request->input('date');
        $partySize = $request->input('partySize');
        $availableSlots = [];
        
        //Predefined timeslots
        $timeSlots = ['16:00-18:00', '18:00-20:00', '20:00-22:00'];

        // Query the database to see which times are available
        foreach ($timeSlots as $timeSlot) {
            if (Booking::isSlotAvailable($date, $timeSlot, $partySize)) {
                $availableSlots[] = $timeSlot;
            }
        }
        // Return a response
        return response()->json([
            'availableSlots' => $availableSlots,
            'Received date' => $date,
            // Include any other necessary data in the response
        ]);
    }
}
