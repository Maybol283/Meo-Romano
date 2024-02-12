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
        Schema::table('bookings', function (Blueprint $table) {
            // Ensure 'pin' column exists and is suitable for a primary key
            // For example, if 'pin' is not already unique and not nullable, make it so
            // $table->string('pin')->unique()->nullable(false)->change();

            // Drop the existing primary key
            $table->dropPrimary();

            // Set 'pin' as the new primary key
            $table->primary('pin');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Drop the 'pin' primary key
            $table->dropPrimary('pin');

            // Recreate the 'id' primary key
            $table->id()->first();

            // If you made 'pin' unique and not nullable above, revert those changes if needed
            // $table->string('pin')->nullable()->change();
        });
    }
};