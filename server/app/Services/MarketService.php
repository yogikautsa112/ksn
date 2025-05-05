<?php

namespace App\Services;

use App\Repositories\MarketRepository;
use App\Http\Resources\MarketResource;

class MarketService
{
    private $marketRepository;
    
    public function __construct(MarketRepository $marketRepository)
    {
        $this->marketRepository = $marketRepository;
    }

    public function index()
    {
        $market = $this->marketRepository->getAll();
        return MarketResource::collection($market);
    }

    public function detail($id)
    {
        $market = $this->marketRepository->getById($id);
        return new marketResource($market);
    }

    public function store(array $data)
    {
        $market = $this->marketRepository->create($data);
        return new marketResource($market);
    }

    public function update(array $data, $id)
    {
        $market = $this->marketRepository->update($data, $id);
        return new marketResource($market);
    }

    public function destroy($id)
    {
        return $this->marketRepository->delete($id);
    }
}