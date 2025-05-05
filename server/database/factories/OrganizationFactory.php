<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition()
    {
        return [
            'id' => Str::uuid(),
            'name' => $this->faker->company(),
            'address' => $this->faker->address(),
            'phone' => $this->faker->numerify('08##########'),
            'type' => $this->faker->randomElement([
                Organization::PT,
                Organization::UMKM,
                Organization::KOPERASI,
                Organization::EXPORTIR,
                Organization::IMPORTIR,
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
