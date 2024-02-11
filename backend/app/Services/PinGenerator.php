<?php

namespace App\Services;

use App\Models\Booking; 
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
// Function to generate a unique 6-digit PIN

class PinGenerator
{
    public function generateUniquePIN()
    {
        do {
            $pin = Str::random(6); // Generate a random 6-character string
            // Check if the PIN already exists in the database
            Log::info("Generated PIN: $pin");
            $existingBooking = Booking::where('pin', $pin)->first();
        } while ($existingBooking); // Repeat until a unique PIN is found

        return $pin;
    }
}
