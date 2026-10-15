<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Sam',
            'email' => config('services.admin_email'),
        ]);

        $this->call([
            LevelConfigurationSeeder::class,
            WordSeeder::class,
            StudentSeeder::class,
        ]);
    }
}
