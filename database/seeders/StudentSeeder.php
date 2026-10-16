<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Amelie Taboada',
                'slug' => 'amelie-taboada',
                'access_token' => '7a2k',
                'avatar' => '👧',
                'parent_name' => 'Familia Taboada',
            ],
            [
                'name' => 'Arya Urbano',
                'slug' => 'arya-urbano',
                'access_token' => '4m9x',
                'avatar' => '👧',
                'parent_name' => 'Familia Urbano',
            ],
            [
                'name' => 'Alana Vílchez',
                'slug' => 'alana-vilchez',
                'access_token' => '8v3p',
                'avatar' => '👧',
                'parent_name' => 'Familia Vílchez',
            ],
        ];

        foreach ($students as $data) {
            $student = Student::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );
            $student->initializeLevels();
        }
    }
}
