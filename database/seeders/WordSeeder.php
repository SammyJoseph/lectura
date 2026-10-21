<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Orchestrates word and syllable seeders across levels.
     */
    public function run(): void
    {
        $this->call([
            Level1SyllableSeeder::class,
            Level2WordSeeder::class,
        ]);
    }
}
