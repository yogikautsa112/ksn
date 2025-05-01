<?php

namespace App\Services;

use App\Repositories\CommodityRepository;

class CommodityService
{
    private $commodityRepository;
    public function __construct(CommodityRepository $commodityRepository)
    {
        $this->commodityRepository = $commodityRepository;
    }

    public function index()
    {
        return $this->commodityRepository->getAll();
    }

    public function detail($id)
    {
        return $this->commodityRepository->getById($id);
    }

    public function store(array $data){
        return $this->commodityRepository->create($data);
    }

    public function update(array $data, $id){
        return $this->commodityRepository->update($data, $id);
    }

    public function destroy($id){
        return $this->commodityRepository->delete($id);
    }
}