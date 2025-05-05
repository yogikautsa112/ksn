<?php 

namespace App\Repositories;

use App\Models\Warehouse;

class WarehouseRepository {
    public function getAll(){
        return Warehouse::all();
    }

    public function getById($id){
        return Warehouse::find($id);
    }

    public function create(array $data){
        return Warehouse::create($data);
    }

    public function update(array $data, $id){
        Warehouse::find($id)->update($data);
        return Warehouse::find($id);
    }

    public function delete($id){
        return Warehouse::find($id)->delete();
    }

}