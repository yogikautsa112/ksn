<?php 

namespace App\Http\Requests;

use App\Models\Market;
use App\Models\Organization;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;

class MarketRequest
{
    public static function validate(Request $request)
    {
        $rules = [
            'name' => 'required|string',
            'type' => 'required|string|in:' . implode(',', Market::getTypes()),
            'location' =>'required|string',
        ];

        $validator = app(Factory::class)->make($request->all(), $rules);

        if ($validator->fails()) {
            response()->json($validator->errors(), 400)->send();
            exit();
        }

        return $validator->validated();
    }
}
