<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'transaction' => new TransactionResource($this->whenLoaded('transaction')),
            'origin_warehouse' => new WarehouseResource($this->whenLoaded('originWarehouse')),
            'destination_market' => new MarketResource($this->whenLoaded('destinationMarket')),
            'status' => $this->status,
            'current_location' => $this->current_location,
            'departure_time' => $this->departure_time,
            'arrival_time' => $this->arrival_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}