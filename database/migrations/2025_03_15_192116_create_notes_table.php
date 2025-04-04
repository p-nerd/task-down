<?php

use App\Models\User;
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
        Schema::create('notes', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignIdFor(User::class);

            $table->string('name');
            $table->text('content');
            $table->integer('order')->default(0);

            $table->timestamp('pin_at')->nullable();
            $table->timestamp('archive_at')->nullable();
            $table->softDeletes();

            $table->timestamps();

            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
