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

    public const PENDING = 'PENDING';
    public const IN_TRANSIT = 'IN_TRANSIT';
    public const DELIVERED = 'DELIVERED';
}
