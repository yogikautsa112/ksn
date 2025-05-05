<?php 

namespace App\Repositories;

use App\Models\Shipment;

class ShipmentRepository {
    public function getAll(){
        return Shipment::all();
    }

    public function getById($id){
        return Shipment::find($id);
    }

    public function create(array $data){
        return Shipment::create($data);
    }

    public function update(array $data, $id){
        Shipment::find($id)->update($data);
        return Shipment::find($id);
    }

    public function delete($id){
        return Shipment::find($id)->delete();
    }

}