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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('seller_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('buyer_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('commodity_id')->constrained('commodities')->cascadeOnDelete();
            $table->uuid('shipment_id')->nullable()->constrained('shipments')->nullOnDelete();
            $table->uuid('market_id')->nullable()->constrained('markets')->nullOnDelete();
            $table->integer('quantity');
            $table->decimal('price_per_unit', 12, 2);
            $table->enum('status', ['PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
