<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'quantity',
        'price_per_unit',
        'status'
    ];

    public const PENDING = 'PENDING';
    public const CONFIRMED = 'CONFIRMED';
    public const DELIVERED = 'DELIVERED';
    public const SHIPPED = 'SHIPPED';
    public const COMPLETED = 'COMPLETED';
}
