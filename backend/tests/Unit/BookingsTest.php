<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Bookings;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookingsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_checks_if_a_slot_is_available()
    {
        // Create a booking that occupies a slot
        $booking = Bookings::factory()->create([
            'date' => '2024-01-01',
            'time_slot' => '18:00-20:00',
            'tables_needed' => 2,
        ]);

        // Attempt to book the same slot with more tables than available
        $isAvailable = Bookings::isSlotAvailable('2024-01-01', '18:00-20:00', 9);

        // Assert the slot is not available
        $this->assertFalse($isAvailable);
    }

    /** @test */
    public function it_fetches_update_info_for_a_given_pin()
    {
        // Create a booking
        $booking = Bookings::factory()->create([
            'pin' => '1234',
        ]);

        // Fetch update info
        $updateInfo = Bookings::fetchUpdateInfo('1234');

        // Assert the fetched info matches
        $this->assertEquals($booking->first_name, $updateInfo->first_name);
    }

    /** @test */
    public function it_deletes_a_booking()
    {
        // Create a booking
        $booking = Bookings::factory()->create();

        // Delete the booking
        $result = Bookings::deleteBooking($booking->pin);

        // Assert the booking was deleted
        $this->assertTrue($result);
        $this->assertDatabaseMissing('bookings', ['id' => $booking->id]);
    }

    /** @test */
    public function it_updates_a_booking()
    {
        // Create a booking
        $booking = Bookings::factory()->create();

        // Update the booking
        $updatedInfo = [
            'tables_needed' => 5,
            'time_slot' => '16:00-18:00',
            'date' => '2024-01-02',
            'party_size' => 4,
        ];
        $result = Bookings::updateBooking($updatedInfo, $booking->pin);

        // Assert the booking was updated
        $this->assertTrue($result);
        $this->assertDatabaseHas('bookings', ['id' => $booking->id] + $updatedInfo);
    }
}
