<?php 

namespace App\Repositories;

use App\Models\Commodity;

class CommodityRepository {
    public function getAll(){
        return Commodity::all();
    }

    public function getById($id){
        return Commodity::find($id);
    }

    public function create(array $data){
        return Commodity::create($data);
    }

    public function update(array $data, $id){
        Commodity::find($id)->update($data);
        return Commodity::find($id);
    }

    public function delete($id){
        return Commodity::find($id)->delete();
    }

}