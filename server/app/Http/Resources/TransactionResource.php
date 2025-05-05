<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'commodity_id' => new CommodityResource($this->whenLoaded('commodity')),
            'shipment_id' => new ShipmentResource($this->whenLoaded('shipment')),
            'market_id' => new MarketResource($this->whenLoaded('market')),
            'quantity' => $this->quantity,
            'price_per_unit' => $this->price_per_unit,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}