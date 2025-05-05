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
            'type' => $this->faker->randomElement(['pangan', 'non-pangan']), 
            'unit' => $this->faker->randomElement(['kg', 'ton', 'liter']),
            'origin_location' => $this->faker->city(),
            'harvest_date' => $this->faker->date(),
            'quality_grade' => $this->faker->randomElement(['a', 'b', 'c']), 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
