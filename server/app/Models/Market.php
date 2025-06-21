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

    public const LOCAL = 'LOCAL';
    public const NASIONAL = 'NASIONAL';
    public const INTERNATIONAL = 'INTERNASIONAL';

    public static function getTypes()
    {
        return [
            self::LOCAL,
            self::NASIONAL,
            self::INTERNATIONAL,
        ];
    }

    protected $table = 'markets';
}