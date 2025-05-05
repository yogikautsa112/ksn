<?php

use App\Http\Controllers\CommodityController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\MarketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('commodity', CommodityController::class);
Route::apiResource('organization', OrganizationController::class);
Route::apiResource('shipment', ShipmentController::class);
Route::apiResource('market', MarketController::class);