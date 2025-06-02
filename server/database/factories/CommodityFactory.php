<?php

namespace Database\Factories;

use App\Models\Commodity;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CommodityFactory extends Factory
{
    protected $model = Commodity::class;

    public function definition()
    {
        return [
            'id' => Str::uuid(),
            'name' => $this->faker->word(),
            'type' => $this->faker->randomElement([Commodity::PANGAN, Commodity::NON_PANGAN]), 
            'unit' => $this->faker->randomDigit(),
            'origin_location' => $this->faker->city(),
            'harvest_date' => $this->faker->date(),
            'quality_grade' => $this->faker->randomElement([Commodity::A, Commodity::B, Commodity::C]), 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
