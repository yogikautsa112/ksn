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
        Schema::create('commodities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->index();
            $table->enum('type', ['pangan', 'non-pangan']);
            $table->string('unit', 20);
            $table->text('origin_location')->nullable();
            $table->date('harvest_date')->nullable();
            $table->enum('quality_grade', ["a", "b", "c"])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commodities');
    }
};
