<?php 

namespace App\Http\Requests;

use App\Models\Commodity;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;

class CommodityRequest
{
    public static function validate(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'type' => 'required|in:' . implode(',', [Commodity::PANGAN, Commodity::NON_PANGAN]),
            'unit' => 'required|string|max:50',
            'origin_location' => 'nullable|string|max:255',
            'harvest_date' => 'nullable|date',
            'quality_grade' => 'nullable|in:' . implode(',', [Commodity::A, Commodity::B, Commodity::C]),
        ];

        $validator = app(Factory::class)->make($request->all(), $rules);

        if ($validator->fails()) {
            response()->json($validator->errors(), 400)->send();
            exit();
        }

        return $validator->validated();
    }
}
