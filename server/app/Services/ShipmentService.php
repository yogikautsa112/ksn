<?php

namespace App\Services;

use App\Repositories\ShipmentRepository;
use App\Http\Resources\ShipmentResource;

class ShipmentService
{
    private $shipmentRepository;
    
    public function __construct(ShipmentRepository $shipmentRepository)
    {
        $this->shipmentRepository = $shipmentRepository;
    }

    public function index()
    {
        $shipments = $this->shipmentRepository->getAll();
        return ShipmentResource::collection($shipments);
    }

    public function detail($id)
    {
        $shipment = $this->shipmentRepository->getById($id);
        return new ShipmentResource($shipment);
    }

    public function store(array $data)
    {
        $shipment = $this->shipmentRepository->create($data);
        return new ShipmentResource($shipment);
    }

    public function update(array $data, $id)
    {
        $shipment = $this->shipmentRepository->update($data, $id);
        return new ShipmentResource($shipment);
    }

    public function destroy($id)
    {
        return $this->shipmentRepository->delete($id);
    }
}