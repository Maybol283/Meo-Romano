<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookings;
use App\Mail\BookingMail;
use Illuminate\Support\Facades\Mail;
use App\Services\PinGenerator; // Correct namespace
use Illuminate\Support\Facades\Log;

class ReservationController
{
    protected $pinGenerator;

    public function __construct(PinGenerator $pinGenerator)
    {
        $this->pinGenerator = $pinGenerator;
    }



    public function getTimeSlot(Request $request)
    {

        Log::info('Received PIN: ' . $request);
        // Access the data sent from the front-end
        $validated = $request->validate([
            'date' => 'required|date',
            'tablesNeeded' => 'required|integer',
        ]);

        $date = $validated['date'];
        $tablesNeeded = $validated['tablesNeeded'];
        $availableSlots = [];

        //Predefined timeslots
        $timeSlots = ['16:00-18:00', '18:00-20:00', '20:00-22:00'];

        // Query the database to see which times are available
        foreach ($timeSlots as $timeSlot) {
            if (Bookings::isSlotAvailable($date, $timeSlot, $tablesNeeded)) {
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
            'party_size' => 'required|integer'
        ]);

        $pin = $this->pinGenerator->generateUniquePIN(); // Generate a unique pin for each booking

        $booking = Bookings::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'phone_number' => $validatedData['phone_number'],
            'email' => $validatedData['email'],
            'tables_needed' => $validatedData['tables_needed'],
            'time_slot' => $validatedData['time_slot'],
            'date' => $validatedData['date'],
            'pin' => $pin,
            'party_size' => $validatedData['party_size'],
        ]);

        if ($booking) {
            // Prepare the data to send in the email
            $emailData = [
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'time_slot' => $validatedData['time_slot'],
                'date' => $validatedData['date'],
                'pin' => $pin
            ];

            // Send the booking confirmation email
            Mail::to($validatedData['email'])->send(new BookingMail($emailData));

            // Return a successful response
            return response()->json(['message' => 'Booking successful, confirmation email sent.'], 201);
        }

        // Return an error response if the booking couldn't be created
        return response()->json(['message' => 'An error occurred'], 500);
    }

    public function getUpdateInfo(Request $request)
    {

        $pin = $request->input('pin');

        $updateInfo = Bookings::fetchUpdateInfo($pin);
        if ($updateInfo) {
            // If you need to manipulate or return the data, do it here
            return response()->json($updateInfo); // Convert the result to JSON
        } else {
            return response()->json(['message' => 'Booking not found'], 404);
        }
    }

    public function deleteBooking(Request $request)
    {

        $pin = $request->input('pin');

        if (Bookings::deleteBooking($pin)) {
            return response()->json(['message' => 'Booking deleted successfully.']);
        } else {
            return response()->json(['message' => 'Booking not found.'], 404);
        }
    }

    public function updateBooking(Request $request)
    {



        $validatedData = $request->validate([
            'tables_needed' => 'required|integer',
            'time_slot' => 'required|string|max:255',
            'date' => 'required|date',
            'party_size' => 'required|integer',
            'pin' => 'required|string|max:255'
        ]);

        $changedInfo = [
            'tables_needed' => $validatedData['tables_needed'],
            'time_slot' => $validatedData['time_slot'],
            'date' => $validatedData['date'],
            'party_size' => $validatedData['party_size'],
        ];

        $updatingInfo = Bookings::updateBooking($changedInfo, $validatedData['pin']);

        if ($updatingInfo) {
            return response()->json(['message' => 'Booking updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Booking not found'], 404);
        }
    }

    public function getAllBookingInfo()
    {
        $bookings = Bookings::paginate(10);

        return response()->json($bookings);
    }

    public function issueToken(Request $request)
    {
    }
}
