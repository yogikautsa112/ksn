<?php 

namespace App\Repositories;

use App\Models\Market;

class MarketRepository {
    public function getAll(){
        return Market::all();
    }

    public function getById($id){
        return Market::find($id);
    }

    public function create(array $data){
        return Market::create($data);
    }

    public function update(array $data, $id){
        Market::find($id)->update($data);
        return Market::find($id);
    }

    public function delete($id){
        return Market::find($id)->delete();
    }

}