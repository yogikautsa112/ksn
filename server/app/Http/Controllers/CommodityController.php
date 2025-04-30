<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommodityRequest;
use App\Http\Resources\CommodityResource;
use App\Services\CommodityService;
use Illuminate\Http\Request;

class CommodityController extends Controller
{
    private $commodityService;

    public function __construct(CommodityService $commodityService)
    {
        $this->commodityService = $commodityService;
    }
    public function index()
    {
        try {
            $commodities = $this->commodityService->index();
            return response()->json(CommodityResource::collection($commodities), 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    
    public function store(Request $request)
    {
        try {
            $payload = CommodityRequest::validate($request);
            $commodity = $this->commodityService->store($payload);
            return response()->json(new CommodityResource($commodity), 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function show($id)
    {
        try {
            $commodity = $this->commodityService->detail($id);
            return response()->json(new CommodityResource($commodity), 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $payload = CommodityRequest::validate($request);
            $commodity = $this->commodityService->update( $payload, $id);
            return response()->json(new CommodityResource($commodity), 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function destroy($id)
    {
        try {
            $commodity = $this->commodityService->destroy($id);
            return response()->json([
                'message' => 'Commodity deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
    }
}