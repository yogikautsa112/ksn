<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentRequest;
use App\Http\Resources\ShipmentResource;
use App\Services\ShipmentService;
use Illuminate\Http\JsonResponse;

class ShipmentController extends Controller
{
    private ShipmentService $shipmentService;

    public function __construct(ShipmentService $shipmentService)
    {
        $this->shipmentService = $shipmentService;
    }

    public function index(): JsonResponse
    {
        try {
            $shipments = $this->shipmentService->index();
            return response()->json(ShipmentResource::collection($shipments), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(ShipmentRequest $request): JsonResponse
    {
        try {
            $shipment = $this->shipmentService->store($request->validated());
            return response()->json(new ShipmentResource($shipment), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $shipment = $this->shipmentService->detail($id);
            return response()->json(new ShipmentResource($shipment), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function update(ShipmentRequest $request, string $id): JsonResponse
    {
        try {
            $shipment = $this->shipmentService->update($request->validated(), $id);
            return response()->json(new ShipmentResource($shipment), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->shipmentService->destroy($id);
            return response()->json(['message' => 'Shipment deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
