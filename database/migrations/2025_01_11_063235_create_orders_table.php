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
            $table->id('order_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('landingpage_id')->unique();
            $table->unsignedBigInteger('delivery_id');
            $table->string('company_profile', 255);
            $table->text('description');
            $table->date('payment_date');
            $table->enum('payment_status', ['pending', 'success', 'failed', 'canceled', 'deny']);
            $table->enum('order_status', [
                'pending', 'paid', 'processing', 'shipped',
                'delivered', 'completed', 'canceled',
                'failed', 'refunded', 'on_hold'
            ]);
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('no action');
            $table->foreign('landingpage_id')->references('landingpage_id')->on('landing_pages')->onDelete('cascade');
            $table->foreign('delivery_id')->references('delivery_id')->on('deliveries')->onDelete('no action');
        });

    }


    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
