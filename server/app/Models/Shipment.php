<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'status',
        'curent_location',
    ];

    public const PENDING = 'pending';
    public const IN_TRANSIT = 'in_transit';
    public const DELIVERED = 'delivered';
}
