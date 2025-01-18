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
        Schema::create('essentials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->json('tags');
            $table->bigInteger('category');
            $table->bigInteger('user_id');
            $table->boolean('generated')->default(true);
            $table->timestamps();
        });

        Schema::table('essentials', function (Blueprint $table) {
            $table->foreign('category')->references('id')->on('categories');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('essentials');
    }
};
