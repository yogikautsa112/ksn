<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationRequest;
use App\Http\Resources\OrganizationResource;
use App\Services\OrganizationService;
use Illuminate\Http\JsonResponse;

class OrganizationController extends Controller
{
    private OrganizationService $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }

    public function index(): JsonResponse
    {
        try {
            $organizations = $this->organizationService->index();
            return response()->json(OrganizationResource::collection($organizations), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(OrganizationRequest $request): JsonResponse
    {
        try {
            $organization = $this->organizationService->store($request->validated());
            return response()->json(new OrganizationResource($organization), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $organization = $this->organizationService->detail($id);
            return response()->json(new OrganizationResource($organization), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function update(OrganizationRequest $request, int $id): JsonResponse
    {
        try {
            $organization = $this->organizationService->update($request->validated(), $id);
            return response()->json(new OrganizationResource($organization), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->organizationService->destroy($id);
            return response()->json(['message' => 'Organization deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
