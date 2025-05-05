<?php 

namespace App\Repositories;

use App\Models\Organization;

class OrganizationRepository {
    public function getAll(){
        return Organization::all();
    }

    public function getById($id){
        return Organization::find($id);
    }

    public function create(array $data){
        return Organization::create($data);
    }

    public function update(array $data, $id){
        Organization::find($id)->update($data);
        return Organization::find($id);
    }

    public function delete($id){
        return Organization::find($id)->delete();
    }

}