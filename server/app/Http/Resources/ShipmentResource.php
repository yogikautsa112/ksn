<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'transaction_id' => $this->trancsaction_id,
            'origin_wharehouse_id' => $this->origin_wharehouse_id,
            'destination_market_id' => $this->destination_market_id,
            'status' => $this->status,
            'current_location' => $this->curent_location,
            'departure_time' => $this->departure_time,
            'arrival_time' => $this->arrival_time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}