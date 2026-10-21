<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name();

        return [
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(100, 9999),
            'access_token' => Str::lower(Str::random(4)),
            'avatar' => fake()->randomElement(['👧', '👦', '🦁', '🐼', '🦄', '🚀', '⭐']),
            'parent_name' => fake()->name(),
            'parent_phone' => fake()->phoneNumber(),
            'is_active' => true,
        ];
    }
}
