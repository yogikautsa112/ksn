<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'manager_id' => $this->manager_id,
            'name' => $this->name,
            'location' => $this->location,
            'capacity' => $this->capacity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}