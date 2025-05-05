<?php 

namespace App\Http\Requests;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;

class OrganizationRequest
{
    public static function validate(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'type' => 'required|in:' . implode(',', [Organization::PT, Organization::UMKM, Organization::IMPORTIR, Organization::EXPORTIR]),
            'address' => 'nullable|string|max:255',
            'npwp_number' => 'nullable|string|max:255',
            'verified' => 'nullable|boolean',
        ];

        $validator = app(Factory::class)->make($request->all(), $rules);

        if ($validator->fails()) {
            response()->json($validator->errors(), 400)->send();
            exit();
        }

        return $validator->validated();
    }
}
