<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop the old bookings table if it exists
        Schema::dropIfExists('bookings');

        // Create the new bookings table
        Schema::create('bookings', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing ID column
            $table->string('pin')->unique(); // Assuming 'pin' is unique
            $table->date('date');
            $table->string('time_slot');
            $table->integer('party_size');
            $table->integer('tables_needed');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone_number')->nullable();
            $table->timestamps(); // Creates 'created_at' and 'updated_at' columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop the new bookings table
        Schema::dropIfExists('bookings');
    }
};
