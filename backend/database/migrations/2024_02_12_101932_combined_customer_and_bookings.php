<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
       
        });
    }

    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['first_name', 'last_name', 'email', 'phone_number']);
            // Drop the added customer fields if rolling back
            Schema::table('bookings', function (Blueprint $table) {
                // If you're dropping the column in 'up', you'll need to recreate it here
                 $table->unsignedBigInteger('customer_id')->nullable();
                 $table->foreign('customer_id')->references('id')->on('customers');
            });
        });
    }
};