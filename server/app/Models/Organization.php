<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'type',
        'address',
        'npwp_number',
        'verified',
    ];

    public const KOPERASI = 'Koperasi';
    public const UMKM = 'UMKM';
    public const PT = 'PT';
    public const IMPORTIR = 'Importir';
    public const EXPORTIR = 'Exportir';
    protected $casts = [
        'verified' => 'boolean',
    ];
}
