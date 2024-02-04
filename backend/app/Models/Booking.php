<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'time_slot', 'tables_needed', 'customer_id'];

    public static function isSlotAvailable($date, $timeSlot, $tablesNeeded)
    {
        $totalBookedTables = self::where('date', $date)
                                ->where('time_slot', $timeSlot)
                                ->sum('tables_needed');

        $totalTables = 10;
        return ($totalBookedTables + $tablesNeeded) <= $totalTables;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
