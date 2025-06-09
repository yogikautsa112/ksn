<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Commodity;
use App\Models\Shipment;
use App\Models\Market;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED'];

        return [
            'id' => Str::uuid(),
            'seller_id' => fn() => User::factory()->create()->id,
            'buyer_id' => fn() => User::factory()->create()->id,
            'commodity_id' => fn() => Commodity::factory()->create()->id,
            'shipment_id' => fn() => Shipment::factory()->make()->id, // Gunakan make() untuk menghindari rekursi
            'market_id' => fn() => Market::factory()->create()->id,
            'quantity' => $this->faker->numberBetween(1, 500),
            'price_per_unit' => $this->faker->randomFloat(2, 5, 2000),
            'status' => $this->faker->randomElement($statuses),
        ];
    }
}
