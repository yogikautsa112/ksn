<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Shipment;
use App\Services\ShipmentService;
use App\Http\Controllers\ShipmentController;
use App\Http\Requests\ShipmentRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Mockery;

class ShipmentTest extends TestCase
{
    use RefreshDatabase;

    protected $shipmentService;
    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->shipmentService = Mockery::mock(ShipmentService::class);
        $this->controller = new ShipmentController($this->shipmentService);
    }

    public function testIndex(): void
    {
        $shipments = Shipment::factory()->count(3)->make();
        $this->shipmentService->shouldReceive('index')->once()->andReturn($shipments);

        $response = $this->controller->index();
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testShow(): void
    {
        $id = Uuid::uuid4()->toString();
        $shipment = Shipment::factory()->make(['id' => $id]);
        $this->shipmentService->shouldReceive('detail')->with($id)->once()->andReturn($shipment);

        $response = $this->controller->show($id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testCreate(): void
    {
        $data = [
            'transaction_id' => Uuid::uuid4()->toString(),
            'origin_wharehouse_id' => Uuid::uuid4()->toString(),
            'destination_market_id' => Uuid::uuid4()->toString(),
            'status' => Shipment::PENDING,
            'current_location' => 'Jakarta Warehouse',
            'departure_time' => '2024-01-01 08:00:00',
            'arrival_time' => '2024-01-02 15:00:00'
        ];

        $shipment = Shipment::factory()->make($data);

        $request = Mockery::mock(ShipmentRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->shipmentService->shouldReceive('store')->with($data)->once()->andReturn($shipment);

        $response = $this->controller->store($request);
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testUpdate(): void
    {
        $id = Uuid::uuid4()->toString();
        $data = [
            'status' => Shipment::IN_TRANSIT,
            'current_location' => 'Bandung Distribution Center',
            'arrival_time' => '2024-01-03 10:00:00'
        ];

        $shipment = Shipment::factory()->make($data);

        $request = Mockery::mock(ShipmentRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->shipmentService->shouldReceive('update')->with($data, $id)->once()->andReturn($shipment);

        $response = $this->controller->update($request, $id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testDelete(): void
    {
        $id = Uuid::uuid4()->toString();
        $this->shipmentService->shouldReceive('destroy')->with($id)->once()->andReturn(true);

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
