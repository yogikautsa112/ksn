<?php 

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository {
    public function getAll(){
        return Transaction::all();
    }

    public function getById($id){
        return Transaction::find($id);
    }

    public function create(array $data){
        return Transaction::create($data);
    }

    public function update(array $data, $id){
        Transaction::find($id)->update($data);
        return Transaction::find($id);
    }

    public function delete($id){
        return Transaction::find($id)->delete();
    }

}