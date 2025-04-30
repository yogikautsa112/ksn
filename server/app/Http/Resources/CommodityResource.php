<?php 
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class CommodityResource extends JsonResource {
    public function toArray($request) {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'unit' => $this->unit,
            'origin_location' => $this->origin_location,
            'harvest_date'=> $this->harvest_date,
            'quality_grade'
        ];
    }
}