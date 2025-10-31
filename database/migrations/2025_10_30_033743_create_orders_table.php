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
            $table->dateTime("order_date");
            $table->string("order_code", 50);
            $table->decimal("order_amount", 10, 2)->nullable();
            $table->decimal("order_change", 10, 2)->nullable();
            $table->tinyInteger("order_status")->default();
            $table->integer("order_subtotal");
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
