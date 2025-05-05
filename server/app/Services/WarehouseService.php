<?php

namespace App\Services;

use App\Repositories\WarehouseRepository;
use App\Http\Resources\WarehouseResource;

class WarehouseService
{
    private $warehouseRepository;
    
    public function __construct(WarehouseRepository $warehouseRepository)
    {
        $this->warehouseRepository = $warehouseRepository;
    }

    public function index()
    {
        $warehouses = $this->warehouseRepository->getAll();
        return WarehouseResource::collection($warehouses);
    }

    public function detail($id)
    {
        $warehouse = $this->warehouseRepository->getById($id);
        return new WarehouseResource($warehouse);
    }

    public function store(array $data)
    {
        $warehouse = $this->warehouseRepository->create($data);
        return new WarehouseResource($warehouse);
    }

    public function update(array $data, $id)
    {
        $warehouse = $this->warehouseRepository->update($data, $id);
        return new WarehouseResource($warehouse);
    }

    public function destroy($id)
    {
        return $this->warehouseRepository->delete($id);
    }
}