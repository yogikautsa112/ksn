<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    use HasFactory,HasUuids;

    protected $fillable = [
        'name',
        'type',
        'location'
    ];

    public CONST LOCAL = 'local';
    public CONST NASIONAL = 'nasional';
    public CONST INTERNATIONAL = 'international';

    protected $table = 'markets';
}
