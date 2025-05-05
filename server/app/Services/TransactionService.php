<?php

namespace App\Services;

use App\Repositories\TransactionRepository;
use App\Http\Resources\TransactionResource;

class TransactionService
{
    private $transactionRepository;
    
    public function __construct(TransactionRepository $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function index()
    {
        $transactions = $this->transactionRepository->getAll();
        return TransactionResource::collection($transactions);
    }

    public function detail($id)
    {
        $transaction = $this->transactionRepository->getById($id);
        return new TransactionResource($transaction);
    }

    public function store(array $data)
    {
        $transaction = $this->transactionRepository->create($data);
        return new TransactionResource($transaction);
    }

    public function update(array $data, $id)
    {
        $transaction = $this->transactionRepository->update($data, $id);
        return new TransactionResource($transaction);
    }

    public function destroy($id)
    {
        return $this->transactionRepository->delete($id);
    }
}