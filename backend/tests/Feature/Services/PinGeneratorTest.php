<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\PinGenerator;
use App\Models\Bookings;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PinGeneratorTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_generates_a_unique_6_character_pin()
    {
        $pinGenerator = new PinGenerator();

        // Generate a PIN
        $pin = $pinGenerator->generateUniquePIN();

        // Assert the PIN is 6 characters long
        $this->assertEquals(6, strlen($pin));

        // Assert the PIN is unique
        // Attempt to find a booking with the generated PIN
        $existingBooking = Bookings::where('pin', $pin)->first();
        $this->assertNull($existingBooking, "The PIN {$pin} is not unique.");
    }

    /** @test */
    public function it_generates_unique_pins_even_if_some_exist()
    {
        $existingPins = ['abc123', 'def456', 'ghi789'];
        foreach ($existingPins as $pin) {
            // Prepopulate the Bookings table with some PINs
            Bookings::factory()->create(['pin' => $pin]);
        }

        $pinGenerator = new PinGenerator();

        // Generate a new PIN
        $newPin = $pinGenerator->generateUniquePIN();

        // Assert the new PIN is not in the array of existing PINs
        $this->assertNotContains($newPin, $existingPins);

        // Assert the PIN is 6 characters long
        $this->assertEquals(6, strlen($newPin));

        // Ensure the newly generated PIN is indeed unique in the database
        $this->assertDatabaseMissing('bookings', ['pin' => $newPin]);
    }
}
