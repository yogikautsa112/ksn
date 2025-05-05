<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('transaction_id')->constrained('transactions')->cascadeOnDelete();
            $table->uuid('origin_wharehouse_id')->constrained('wharehouses')->cascadeOnDelete();
            $table->uuid('destination_market_id')->constrained('markets')->cascadeOnDelete();
            $table->enum('status', ['PENDING', 'IN_TRANSIT', 'DELIVERED']);
            $table->string('curent_location');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
