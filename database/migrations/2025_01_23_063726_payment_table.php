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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('order_code',15);
            $table->string('transaction_id', 255);
            $table->string('transaction_status', 55);
            $table->enum('payment_type', ['credit_card', 'gopay', 'shopeepay', 'qris', 'cstore', 'bank_transfer', 'echannel']);
            $table->bigInteger('gross_amount');
            $table->timestamp('transaction_time')->nullable();
            $table->timestamp('settlement_time')->nullable();
            $table->string('va_number',50)->nullable();
            $table->string('bank',50)->nullable();
            $table->json('response_json')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
