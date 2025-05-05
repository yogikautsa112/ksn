<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'location',
        'capacity',
        'organization_id',
    ];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
