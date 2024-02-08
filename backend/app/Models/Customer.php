<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email', 'phone_number'];

    // Define a one-to-many relationship with the Booking model
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
