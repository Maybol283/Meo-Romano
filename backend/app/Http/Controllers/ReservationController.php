<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Customer;
use App\Mail\BookingMail;
use Illuminate\Support\Facades\Mail;

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

    public function storeBooking(Request $request)
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

        $customer = Customer::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'phone_number' => $validatedData['phone_number'],
            'email' => $validatedData['email'],
        ]);

        if ($customer) {
            $booking = Booking::create([
                'customer_id' => $customer->id,
                'tables_needed' => $validatedData['tables_needed'],
                'time_slot' => $validatedData['time_slot'],
                'date' => $validatedData['date'],
            ]);

            // Prepare the data to send in the email
            $emailData = [
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'time_slot' => $validatedData['time_slot'],
                'date' => $validatedData['date'],
            ];

           

            // Send the booking confirmation email
            Mail::to($validatedData['email'])->send(new BookingMail($emailData));

            // Return a successful response
            return response()->json(['message' => 'Booking successful, confirmation email sent.'], 201);
        }

        // Return an error response if the customer or booking couldn't be created
        return response()->json(['message' => 'An error occurred'], 500);
    }
}
