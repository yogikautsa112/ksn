<?php

namespace Database\Factories;

use App\Models\Warehouse;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Warehouse>
 */
class WarehouseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Warehouse::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'manager_id' => fn() =>  User::factory()->create()->id,
            'name' => $this->faker->company() . ' Warehouse',
            'location' => $this->faker->address(),
            'capacity' => $this->faker->numberBetween(100, 10000),
        ];
    }
}
