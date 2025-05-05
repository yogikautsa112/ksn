<?php

namespace Tests\Unit;

use App\Models\Commodity;
use App\Models\Market;
use App\Models\Shipment;
use App\Models\User;
use Tests\TestCase;
use App\Models\Transaction;
use App\Services\TransactionService;
use App\Http\Controllers\TransactionController;
use App\Http\Requests\TransactionRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Mockery;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    protected $transactionService;
    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->transactionService = Mockery::mock(TransactionService::class);
        $this->controller = new TransactionController($this->transactionService);
    }

    public function testIndex(): void
    {
        $transactions = Transaction::factory()->count(3)->make();
        $this->transactionService->shouldReceive('index')->once()->andReturn($transactions);

        $response = $this->controller->index();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testShow(): void
    {
        $id = Uuid::uuid4()->toString();
        $transaction = Transaction::factory()->make(['id' => $id]);
        $this->transactionService->shouldReceive('detail')->with($id)->once()->andReturn($transaction);

        $response = $this->controller->show($id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testCreate(): void
    {
        // Create a seller (admin user)
        $seller = User::factory()->create([
            'role' => 'admin'
        ]);

        // Create a buyer (regular user)
        $buyer = User::factory()->create([
            'role' => 'user'
        ]);

        // Create other related models
        $commodity = Commodity::factory()->create();
        $shipment = Shipment::factory()->create();
        $market = Market::factory()->create();

        // Use the IDs in your test data
        $data = [
            'seller_id' => $seller->id,
            'buyer_id' => $buyer->id,
            'commodity_id' => $commodity->id,
            'shipment_id' => $shipment->id,
            'market_id' => $market->id,
            'quantity' => 250,
            'price_per_unit' => 1500.50,
            'status' => 'PENDING'
        ];

        $transaction = Transaction::factory()->make($data);

        $request = Mockery::mock(TransactionRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->transactionService->shouldReceive('store')->with($data)->once()->andReturn($transaction);

        $response = $this->controller->store($request);
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testUpdate(): void
    {
        $id = Uuid::uuid4()->toString();
        $data = [
            'status' => 'COMPLETED',
            'quantity' => 300,
            'price_per_unit' => 1800.75
        ];

        $transaction = Transaction::factory()->make($data);

        $request = Mockery::mock(TransactionRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->transactionService->shouldReceive('update')->with($data, $id)->once()->andReturn($transaction);

        $response = $this->controller->update($request, $id);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testDelete(): void
    {
        $id = Uuid::uuid4()->toString();
        $this->transactionService->shouldReceive('destroy')->with($id)->once()->andReturn(true);

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