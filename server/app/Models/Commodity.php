<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commodity extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = ["id", "name", "type", "unit", "origin_location", "harvest_date", "quality_grade"];

    public const PANGAN = "pangan";
    public const NON_PANGAN = "non-pangan";

    public const A = "a";
    public const B = "b";
    public const C = "c";
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
