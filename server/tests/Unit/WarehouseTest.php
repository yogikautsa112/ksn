<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Warehouse;
use App\Services\WarehouseService;
use App\Http\Controllers\WarehouseController;
use App\Http\Requests\WarehouseRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Mockery;

class WarehouseTest extends TestCase
{
    use RefreshDatabase;

    protected $warehouseService;
    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->warehouseService = Mockery::mock(WarehouseService::class);
        $this->controller = new WarehouseController($this->warehouseService);
    }

    public function testIndex(): void
    {
        $warehouses = Warehouse::factory()->count(3)->make();
        $this->warehouseService->shouldReceive('index')->once()->andReturn($warehouses);

        $response = $this->controller->index();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testShow(): void
    {
        $id = Uuid::uuid4()->toString();
        $warehouse = Warehouse::factory()->make(['id' => $id]);
        $this->warehouseService->shouldReceive('detail')->with($id)->once()->andReturn($warehouse);

        $response = $this->controller->show($id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testCreate(): void
    {
        $data = [
            'manager_id' => Uuid::uuid4()->toString(),
            'name' => 'Jakarta Warehouse',
            'location' => 'Jl. Warehouse No. 123, Jakarta',
            'capacity' => 1000
        ];

        $warehouse = Warehouse::factory()->make($data);

        $request = Mockery::mock(WarehouseRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->warehouseService->shouldReceive('store')->with($data)->once()->andReturn($warehouse);

        $response = $this->controller->store($request);
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testUpdate(): void
    {
        $id = Uuid::uuid4()->toString();
        $data = [
            'manager_id' => Uuid::uuid4()->toString(),
            'name' => 'Updated Jakarta Warehouse',
            'location' => 'Jl. Warehouse Baru No. 456, Jakarta',
            'capacity' => 1500
        ];

        $warehouse = Warehouse::factory()->make($data);

        
        $request = Mockery::mock(WarehouseRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->warehouseService->shouldReceive('update')->with($data, $id)->once()->andReturn($warehouse);

        $response = $this->controller->update($request, $id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testDelete(): void
    {
        $id = Uuid::uuid4()->toString();
        $this->warehouseService->shouldReceive('destroy')->with($id)->once()->andReturn(true);

        $response = $this->controller->destroy($id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}