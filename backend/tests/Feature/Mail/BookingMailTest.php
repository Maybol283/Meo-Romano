<?php

namespace Tests\Feature\Mail;

use Tests\TestCase;
use App\Mail\BookingMail;
use Illuminate\Support\Facades\Mail;

class BookingMailTest extends TestCase
{
    /** @test */
    public function booking_email_is_sent()
    {
        Mail::fake();

        // Assuming you have a route that triggers the sending of the BookingMail
        // For the purpose of this example, let's assume the route is `/make-booking`
        $bookingData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone_number' => '1234567890',
            'email' => 'john.doe@example.com',
            'tables_needed' => 1,
            'time_slot' => '18:00-20:00',
            'date' => '2024-03-01',
            'party_size' => 4,
            'pin' => '1234',
        ];

        $response = $this->post('/api/reservations/store', $bookingData);

        Mail::assertSent(BookingMail::class);
    }
}
