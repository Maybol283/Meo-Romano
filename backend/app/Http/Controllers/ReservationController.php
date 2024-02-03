<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function queryReservations(Request $request)
    {
        // Access the data sent from the front-end
        $partySize = $request->input('partySize');
        $date = $request->input('date');

        // Perform your logic here (e.g., query the database)
        \Log::info('Received partySize: ' . $partySize);
        \Log::info('Received date: ' . $date);
        // Return a response
        return response()->json([
            'Received partySize' => $partySize,
            'Received date' => $date,
            // Include any other necessary data in the response
        ]);
    }
}
