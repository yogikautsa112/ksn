<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Organization;
use App\Services\OrganizationService;
use App\Http\Controllers\OrganizationController;
use App\Http\Requests\OrganizationRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class OrganizationTest extends TestCase
{
    use RefreshDatabase;

    protected $organizationService;
    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->organizationService = Mockery::mock(OrganizationService::class);
        $this->controller = new OrganizationController($this->organizationService);
    }

    public function testIndex(): void
    {
        $organizations = Organization::factory()->count(3)->make();
        $this->organizationService->shouldReceive('index')->once()->andReturn($organizations);

        $response = $this->controller->index();
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testShow(): void
    {
        $organization = Organization::factory()->make(['id' => 1]);
        $this->organizationService->shouldReceive('detail')->with(1)->once()->andReturn($organization);

        $response = $this->controller->show(1);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testCreate(): void
    {
        $data = [
            'name' => 'Test Organization',
            'address' => 'Test Address',
            'phone' => '1234567890',
            'type' => Organization::PT,
            'npwp_number' => '1234567890',
        ];

        $organization = Organization::factory()->make($data);

        $request = Mockery::mock(OrganizationRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->organizationService->shouldReceive('store')->with($data)->once()->andReturn($organization);

        $response = $this->controller->store($request);
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testUpdate(): void
    {
        $data = [
            'name' => 'Updated Org',
            'address' => 'New Address',
            'phone' => '0987654321',
            'type' => Organization::UMKM,
        ];

        $organization = Organization::factory()->make($data);

        $request = Mockery::mock(OrganizationRequest::class);
        $request->shouldReceive('validated')->once()->andReturn($data);

        $this->organizationService->shouldReceive('update')->with($data, 1)->once()->andReturn($organization);

        $response = $this->controller->update($request, 1);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function testDelete(): void
    {
        $this->organizationService->shouldReceive('destroy')->with(1)->once()->andReturn(true);

        $response = $this->controller->destroy(1);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
