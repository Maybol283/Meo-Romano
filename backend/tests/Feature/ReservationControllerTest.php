<?php

namespace Tests\Feature;

use App\Mail\BookingMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Bookings;
use Illuminate\Support\Facades\Mail;

class ReservationControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testGetTimeSlotReturnsAvailableSlots()
    {
        // Assuming you have a seeder or factory to create bookings
        // This ensures the database is in a known state before testing

        $response = $this->get('/api/reservations/query?date=2024-03-01&tablesNeeded=2');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'availableSlots',
                'Received date',
            ]);
    }

    public function testStoreBookingCreatesNewBookingAndSendsEmail()
    {
        Mail::fake();

        $response = $this->json('POST', '/api/reservations/store', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone_number' => '1234567890',
            'email' => 'john.doe@example.com',
            'tables_needed' => 1,
            'time_slot' => '18:00-20:00',
            'date' => '2024-03-01',
            'party_size' => 4,
        ]);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Booking successful, confirmation email sent.']);

        Mail::assertSent(BookingMail::class, 1);
    }


    public function testDeleteBookingSuccessfully()
    {
        // Create a booking using the factory
        $booking = Bookings::factory()->create();

        $response = $this->json('DELETE', '/api/update-manager/delete', ['pin' => $booking->pin]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Booking deleted successfully.']);
    }

    public function testDeleteBookingNotFound()
    {
        $response = $this->json('DELETE', '/api/update-manager/delete', ['pin' => 'nonexistentpin']);

        $response->assertStatus(404)
            ->assertJson(['message' => 'Booking not found.']);
    }

    public function testUpdateBookingSuccessfully()
    {
        // Create a booking using the factory
        $booking = Bookings::factory()->create();

        $updatedData = [
            'tables_needed' => 3, // Assuming new data is different from the original
            'time_slot' => '18:00-20:00',
            'date' => '2024-03-01',
            'party_size' => 5,
            'pin' => $booking->pin
        ];

        $response = $this->json('PATCH', '/api/update-manager/update', $updatedData);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Booking updated successfully']);
    }

    public function testUpdateBookingNotFound()
    {
        $updatedData = [
            'tables_needed' => 3,
            'time_slot' => '18:00-20:00',
            'date' => '2024-03-01',
            'party_size' => 5,
            'pin' => 'nonexistentpin'
        ];

        $response = $this->json('PATCH', '/api/update-manager/update', $updatedData);

        $response->assertStatus(404)
            ->assertJson(['message' => 'Booking not found']);
    }
}
