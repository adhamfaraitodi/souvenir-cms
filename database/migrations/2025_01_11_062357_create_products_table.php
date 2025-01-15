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
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('product_detail_id');
            $table->string('name', 30);
            $table->decimal('price', 15, 2);
            $table->integer('stock');
            $table->timestamps();

            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('no action');
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('no action');
            $table->foreign('product_detail_id')->references('product_detail_id')->on('product_details')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
