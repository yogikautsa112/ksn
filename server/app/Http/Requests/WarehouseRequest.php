<?php 

namespace App\Http\Requests;

use Illuminate\Http\Request;
use Illuminate\Validation\Factory;

class WarehouseRequest
{
    public static function validate(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'capacity' => 'required|integer|min:0',
            'organization_id' => 'required|exists:organizations,id',
            'manager_id' => 'required|exists:users,id'
        ];

        $validator = app(Factory::class)->make($request->all(), $rules);

        if ($validator->fails()) {
            response()->json($validator->errors(), 400)->send();
            exit();
        }

        return $validator->validated();
    }
}
