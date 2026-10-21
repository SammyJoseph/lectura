<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('level')->default(1)->index();
            $wordColumn = $table->string('word');
            if (DB::getDriverName() === 'mysql' || DB::getDriverName() === 'mariadb') {
                $wordColumn->collation('utf8mb4_bin');
            }
            $table->string('emoji')->nullable();
            $table->json('syllables');
            $table->string('phonetic')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
