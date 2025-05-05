<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Market;
use App\Services\MarketService;
use App\Http\Controllers\MarketController;
use App\Http\Requests\MarketRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Mockery;
use Mockery\MockInterface;

class MarketTest extends TestCase
{
    use RefreshDatabase;

    protected $marketService;
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();

        $this->marketService = Mockery::mock(MarketService::class);
        $this->controller = new MarketController($this->marketService);
    }

    public function testIndex(): void
    {
        $markets = Market::factory()->count(3)->make();

        $this->marketService->shouldReceive('index')->once()->andReturn($markets);

        $response = $this->controller->index();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testShow(): void
    {
        $id = Uuid::uuid4()->toString();
        $market = Market::factory()->make(['id' => $id]);

        $this->marketService->shouldReceive('detail')->with($id)->once()->andReturn($market);

        $response = $this->controller->show($id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testCreate(): void
    {
        $data = [
            'name' => 'Pasar Bogor',
            'type' => Market::LOCAL,
            'location' => 'Jl. Raya Pajajaran, Bogor',
        ];

        $market = Market::factory()->make($data);

        $request = Mockery::mock(MarketRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->marketService->shouldReceive('store')->with($data)->once()->andReturn($market);

        $response = $this->controller->store($request);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testUpdate(): void
    {
        $id = Uuid::uuid4()->toString();
        $data = [
            'name' => 'Updated Pasar Bogor',
            'type' => Market::LOCAL,
            'location' => 'Jl. Updated Pajajaran, Bogor',
        ];

        $market = Market::factory()->make($data);

        // Mock the request
        $request = Mockery::mock(MarketRequest::class);
        $request->shouldReceive('validated')
            ->once()
            ->andReturn($data);

        $this->marketService->shouldReceive('update')
            ->with($data, $id)  // Both data and ID
            ->once()
            ->andReturn($market);

        $response = $this->controller->update($request, $id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testDelete(): void
    {
        $id = Uuid::uuid4()->toString();

        $this->marketService->shouldReceive('destroy')->with($id)->once()->andReturn(true);

        $response = $this->controller->destroy($id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
