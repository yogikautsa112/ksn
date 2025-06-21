<?php

namespace App\Services;

use App\Repositories\MarketRepository;

class MarketService
{
    private $marketRepository;
    
    public function __construct(MarketRepository $marketRepository)
    {
        $this->marketRepository = $marketRepository;
    }

    public function index()
    {
        return $this->marketRepository->getAll();
    }

    public function detail($id)
    {
        return $this->marketRepository->getById($id);
    }

    public function store(array $data)
    {
        return $this->marketRepository->create($data);
    }

    public function update(array $data, $id)
    {
        return $this->marketRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->marketRepository->delete($id);
    }
}