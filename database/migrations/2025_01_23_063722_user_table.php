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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->constrained('admins')->noActionOnDelete();
            $table->string('username', 30);
            $table->string('password', 255);
            $table->string('name', 30);
            $table->string('email', 255)->unique();
            $table->string('phone', 15);
            $table->enum('role', ['user']);
            $table->string('remember_token',100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
