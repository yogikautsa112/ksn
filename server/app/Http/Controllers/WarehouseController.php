<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarketRequest;
use App\Http\Requests\WarehouseRequest;
use App\Http\Resources\WarehouseResource;
use App\Services\WarehouseService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WarehouseController extends Controller
{
    private WarehouseService $warehouseService;

    public function __construct(WarehouseService $warehouseService)
    {
        $this->warehouseService = $warehouseService;
    }

    public function index(): JsonResponse
    {
        try {
            $warehouses = $this->warehouseService->index();
            return response()->json(WarehouseResource::collection($warehouses), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(WarehouseRequest $request): JsonResponse
    {
        try {
            $warehouse = $this->warehouseService->store($request->validated());
            return response()->json(new WarehouseResource($warehouse), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $warehouse = $this->warehouseService->detail($id);
            return response()->json(new WarehouseResource($warehouse), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function update(WarehouseRequest $request, string $id): JsonResponse
    {
        try {
            $warehouse = $this->warehouseService->update($request->validated(), $id);id: 
            return response()->json(new WarehouseResource($warehouse), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->warehouseService->destroy($id);
            return response()->json(['message' => 'Warehouse deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
