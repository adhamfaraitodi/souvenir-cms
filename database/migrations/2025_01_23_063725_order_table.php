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
            $table->foreignId('landing_page_id')->nullable()->constrained('landing_pages')->nullOnDelete();
            $table->string('order_code',15);
            $table->string('company_profile', 255)->nullable();
            $table->text('note')->nullable();
            $table->enum('order_status', ['pending', 'in_production', 'shipped', 'completed', 'canceled']);
            $table->integer('qty')->nullable();
            $table->bigInteger('product_price')->nullable();
            $table->bigInteger('delivery_fee')->nullable();
            $table->bigInteger('total_price')->nullable();
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
