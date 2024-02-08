<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyCustomersTable extends Migration
{
    public function up()
    {
        // Remove the address column from the customers table
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('address');
        });

        // Add first_name and last_name columns to the customers table
        Schema::table('customers', function (Blueprint $table) {
            $table->string('first_name')->after('id'); // Add first_name column after id
            $table->string('last_name')->after('first_name'); // Add last_name column after first_name
        });
    }

    public function down()
    {
        // Re-add the address column to the customers table if you want to rollback the migration
        Schema::table('customers', function (Blueprint $table) {
            $table->text('address')->after('email');
        });

        // Remove the first_name and last_name columns from the customers table
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
        });
    }
}