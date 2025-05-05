<?php

namespace Database\Factories;

use App\Models\Shipment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShipmentFactory extends Factory
{
    protected $model = Shipment::class;

    public function definition()
    {
        return [
            'id' => Str::uuid(),
            'transaction_id' => Str::uuid(),
            'origin_wharehouse_id' => Str::uuid(),
            'destination_market_id' => Str::uuid(),
            'status' => $this->faker->randomElement([
                Shipment::PENDING,
                Shipment::IN_TRANSIT,
                Shipment::DELIVERED
            ]),
            'current_location' => $this->faker->city(),
            'departure_time' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'arrival_time' => $this->faker->dateTimeBetween('now', '+1 week'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
