<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('username', 30);
            $table->string('password', 255);
            $table->string('name', 30);
            $table->string('email', 255)->unique();
            $table->enum('role', ['admin', 'seller']);
            $table->string('remember_token',100);
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
