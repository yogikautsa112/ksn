<?php

namespace App\Services;

use App\Repositories\OrganizationRepository;
use App\Http\Resources\OrganizationResource;

class OrganizationService
{
    private $organizationRepository;
    
    public function __construct(OrganizationRepository $organizationRepository)
    {
        $this->organizationRepository = $organizationRepository;
    }

    public function index()
    {
        $organizations = $this->organizationRepository->getAll();
        return OrganizationResource::collection($organizations);
    }

    public function detail($id)
    {
        $organization = $this->organizationRepository->getById($id);
        return new OrganizationResource($organization);
    }

    public function store(array $data)
    {
        $organization = $this->organizationRepository->create($data);
        return new OrganizationResource($organization);
    }

    public function update(array $data, $id)
    {
        $organization = $this->organizationRepository->update($data, $id);
        return new OrganizationResource($organization);
    }

    public function destroy($id)
    {
        return $this->organizationRepository->delete($id);
    }
}