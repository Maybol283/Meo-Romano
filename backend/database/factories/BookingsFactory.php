<?php

namespace Database\Factories;

use App\Models\Bookings;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookings>
 */
class BookingsFactory extends Factory
{
    /**
     * The name of the model that the factory corresponds to.
     *
     * @var string
     */
    protected $model = Bookings::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'date' => $this->faker->date(),
            'time_slot' => $this->faker->randomElement(['16:00-18:00', '18:00-20:00', '20:00-22:00']),
            'tables_needed' => $this->faker->numberBetween(1, 3),
            'pin' => $this->faker->numerify('######'),
            'party_size' => $this->faker->numberBetween(1, 10),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
        ];
    }
}
