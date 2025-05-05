<?php 

namespace App\Http\Requests;

use App\Models\Organization;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;

class ShipmentRequest
{
    public static function validate(Request $request)
    {
        $rules = [
            'transaction_id' => 'required|exists:transactions,id',
            'origin_wharehouse_id' => 'required|exists:warehouses,id',
            'destination_market_id' => 'required|exists:warehouses,id',
            'status' => 'required|in:' . implode(',', [Shipment::PENDING, Shipment::IN_TRANSIT, Shipment::DELIVERED]),
            'current_location' => 'required|string',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
        ];

        $validator = app(Factory::class)->make($request->all(), $rules);

        if ($validator->fails()) {
            response()->json($validator->errors(), 400)->send();
            exit();
        }

        return $validator->validated();
    }
}
