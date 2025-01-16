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
            $table->id('user_id');
            $table->unsignedBigInteger('admin_id');
            $table->string('username', 30)->unique();
            $table->string('password', 255);
            $table->string('name', 30);
            $table->string('email', 255);
            $table->string('phone', 15);
            $table->enum('role', ['user']);
            $table->timestamps();

            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('no action');

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
