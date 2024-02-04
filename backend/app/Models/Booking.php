<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'start_time', 'party_size', 'customer_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
