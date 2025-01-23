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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->noActionOnDelete();
            $table->foreignId('product_id')->constrained('products')->noActionOnDelete();
            $table->foreignId('landing_page_id')->constrained('landing_pages')->cascadeOnDelete();
            $table->string('company_profile', 255);
            $table->text('note')->nullable();
            $table->enum('order_status', ['pending', 'in_production', 'shipped', 'completed', 'canceled']);
            $table->integer('qty');
            $table->decimal('product_price', 15, 2);
            $table->decimal('delivery_fee', 15, 2);
            $table->decimal('total_price', 15, 2);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
