<?php

namespace Database\Seeders;

use App\Models\LevelConfiguration;
use Illuminate\Database\Seeder;

class LevelConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            [
                'level' => 1,
                'name' => 'Palabras Mágicas',
                'description' => 'Descubre palabras sencillas de 2 y 3 sílabas con objetos cotidianos',
                'required_stars' => 100,
                'is_active' => true,
            ],
            [
                'level' => 2,
                'name' => 'Silabario Aventurero',
                'description' => 'Aprende y reconoce el sonido de las sílabas',
                'required_stars' => 100,
                'is_active' => true,
            ],
            [
                'level' => 3,
                'name' => 'Constructores de Palabras',
                'description' => 'Arma y completa palabras divertidas',
                'required_stars' => 100,
                'is_active' => true,
            ],
            [
                'level' => 4,
                'name' => 'Pequeños Lectores',
                'description' => 'Bases sólidas para continuar leyendo con éxito',
                'required_stars' => 100,
                'is_active' => true,
            ],
        ];

        foreach ($levels as $levelData) {
            LevelConfiguration::updateOrCreate(
                ['level' => $levelData['level']],
                $levelData
            );
        }
    }
}
