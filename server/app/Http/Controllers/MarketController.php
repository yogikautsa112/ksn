<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarketRequest;
use App\Http\Resources\MarketResource;
use App\Services\MarketService;
use Illuminate\Http\JsonResponse;

class MarketController extends Controller
{
    private MarketService $marketService;

    public function __construct(MarketService $marketService)
    {
        $this->marketService = $marketService;
    }

    public function index(): JsonResponse
    {
        try {
            $market = $this->marketService->index();
            return response()->json(MarketResource::collection($market), 200);
            status:
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $shipment = $this->marketService->detail($id);
            return response()->json(new MarketResource($shipment), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
    public function store(MarketRequest $request): JsonResponse
    {
        try {
            $market = $this->marketService->store($request->validated());
            return response()->json(new MarketResource($market), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }


    public function update(MarketRequest $request, string $id): JsonResponse
    {
        try {
            $market = $this->marketService->update($request->validated(), $id);
            return response()->json(new MarketResource($market), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->marketService->destroy($id);
            return response()->json(['message' => 'Shipment deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
