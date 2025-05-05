<?php 

namespace App\Http\Requests;

use App\Models\Organization;
use App\Models\Shipment;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;

class TransactionRequest
{
    public static function validate(Request $request)
    {
        $rules = [
            'seller_id' => 'required|exists:user,id',
            'buyer_id' => 'required|exists:buyer,id',
            'commodity_id' =>'required|exists:commodity,id',
            'shipment_id' =>'required|exists:shipment,id',
            'quantity' =>'required|integer',
            'price_per_unit' =>'required|numeric',
            'status' => 'required|in:' . implode(',', [Transaction::PENDING, Transaction::CONFIRMED, Transaction::COMPLETED, Transaction::DELIVERED, Transaction::SHIPPED]),
        ];

        $validator = app(Factory::class)->make($request->all(), $rules);

        if ($validator->fails()) {
            response()->json($validator->errors(), 400)->send();
            exit();
        }

        return $validator->validated();
    }
}
