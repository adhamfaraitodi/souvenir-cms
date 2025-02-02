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
        Schema::create('office_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained('provinces')->noActionOnDelete();
            $table->foreignId('city_id')->constrained('cities')->noActionOnDelete();
            $table->string('postal_code', 15);
            $table->text('street_address');
            $table->string('changed_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_addresses');
    }
};
