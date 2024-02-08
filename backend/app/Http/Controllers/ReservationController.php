<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Customer;

class ReservationController
{

    
    public function getTimeSlot(Request $request)
    {   
        Booking::truncate();
        Customer::truncate();

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

    public function storeBooking (Request $request)
    {

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'tables_needed' => 'required|integer',
            'time_slot' => 'required|string|max:255',
            'date' => 'required|date',
        ]);
    
        // Since validation ensures $request->input('email') is not null, you can directly use the validated data.
        $customer = Customer::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'phone_number' => $validatedData['phone_number'],
            'email' => $validatedData['email'],
        ]);
    
        if ($customer) {
            $booking = Booking::create([
                'customer_id' => $customer->id, // Use the ID of the newly created customer
                'tables_needed' => $request->input('tables_needed'),
                'time_slot' => $request->input('time_slot'),
                'date' => $request->input('date'),
            ]);
        }
    
        return response()->json(['message' => 'Customer Created'], 201);
    }
}
