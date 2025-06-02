<?php

namespace Database\Factories;

use App\Models\Shipment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class ShipmentFactory extends Factory
{
    protected $model = Shipment::class;

    public function definition()
    {
        return [
            'id' => Str::uuid(),
            'transaction_id' => Uuid::uuid4()->toString(), // Gunakan UUID acak daripada membuat Transaction
            'origin_wharehouse_id' => fn() => Str::uuid(), // Gunakan UUID acak
            'destination_market_id' => fn() => Str::uuid(), // Gunakan UUID acak
            'status' => $this->faker->randomElement([
                Shipment::PENDING,
                Shipment::IN_TRANSIT,
                Shipment::DELIVERED
            ]),
            'curent_location' => $this->faker->city(),
            'departure_time' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'arrival_time' => $this->faker->dateTimeBetween('now', '+1 week'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    
    // Tambahkan method untuk mengaitkan dengan Transaction yang sudah ada
    public function forTransaction($transactionId)
    {
        return $this->state(function (array $attributes) use ($transactionId) {
            return [
                'transaction_id' => $transactionId,
            ];
        });
    }
}
