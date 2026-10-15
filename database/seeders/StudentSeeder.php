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
                'avatar' => '👧',
                'parent_name' => 'Familia Taboada',
            ],
            [
                'name' => 'Arya Urbano',
                'slug' => 'arya-urbano',
                'avatar' => '👧',
                'parent_name' => 'Familia Urbano',
            ],
            [
                'name' => 'Alana Vílchez',
                'slug' => 'alana-vilchez',
                'avatar' => '👧',
                'parent_name' => 'Familia Vílchez',
            ],
        ];

        foreach ($students as $data) {
            $student = Student::firstOrCreate(
                ['slug' => $data['slug']],
                $data
            );
            $student->initializeLevels();
        }
    }
}
