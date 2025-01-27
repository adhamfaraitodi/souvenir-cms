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
            $table->id();
            $table->foreignId('admin_id')->constrained('admins')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('categories')->noActionOnDelete();
            $table->string('name', 30);
            $table->bigInteger('price');
            $table->string('product_image', 255);
            $table->integer('weight');
            $table->enum('package', ['Box Kayu', 'Box Suede', 'Box Vynil', 'Box Bludru', 'Box Karton']);
            $table->enum('type', ['retail', 'custom']);
            $table->integer('stock');
            $table->string('for');
            $table->text('specification');
            $table->string('brand', 30);
            $table->timestamps();
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
