<?php

namespace Database\Factories;

use App\Models\Market;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Market>
 */
class MarketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Market::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $marketTypes = ['LOCAL', 'NASIONAL', 'INTERNASIONAL'];

        return [
            'id' => Str::uuid(),
            'name' => $this->faker->company() . ' Market',
            'type' => $this->faker->randomElement($marketTypes),
            'location' => $this->faker->address(),
        ];
    }
}
