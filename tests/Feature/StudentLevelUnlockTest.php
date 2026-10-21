<?php

use App\Filament\Resources\Students\Pages\EditStudent;
use App\Livewire\GameScreen;
use App\Models\Student;
use App\Models\User;
use Livewire\Livewire;

test('a new student automatically has level 1 unlocked and levels 2, 3, 4 locked', function () {
    $student = Student::create([
        'name' => 'Nicolás Progreso',
        'slug' => 'nicolas-progreso-'.uniqid(),
        'avatar' => '👦',
    ]);

    expect($student->isLevelUnlocked(1))->toBeTrue();
    expect($student->isLevelUnlocked(2))->toBeFalse();
    expect($student->isLevelUnlocked(3))->toBeFalse();
    expect($student->isLevelUnlocked(4))->toBeFalse();
});

test('admin can manually unlock any level independently', function () {
    $student = Student::create([
        'name' => 'Valeria Nivel',
        'slug' => 'valeria-nivel-'.uniqid(),
        'avatar' => '👧',
    ]);

    // Admin manually unlocks Level 3 without unlocking Level 2
    $student->setLevelUnlocked(3, true);

    expect($student->isLevelUnlocked(1))->toBeTrue();
    expect($student->isLevelUnlocked(2))->toBeFalse();
    expect($student->isLevelUnlocked(3))->toBeTrue();
    expect($student->isLevelUnlocked(4))->toBeFalse();
});

test('manually unlocked level can be played directly by the student in game screen', function () {
    $student = Student::create([
        'name' => 'Mateo Desbloqueado',
        'slug' => 'mateo-desbloqueado-'.uniqid(),
        'avatar' => '🦁',
    ]);

    // Level 2 is locked initially
    expect($student->isLevelUnlocked(2))->toBeFalse();

    Livewire::test(GameScreen::class, ['student' => $student])
        ->call('selectLevel', 2)
        ->assertNotDispatched('level-started');

    // Admin unlocks Level 2 manually
    $student->setLevelUnlocked(2, true);

    Livewire::test(GameScreen::class, ['student' => $student])
        ->call('selectLevel', 2)
        ->assertDispatched('level-started', function ($name, $params) {
            $data = is_array($params) && isset($params[0]) && is_array($params[0]) ? $params[0] : $params;

            return ($data['level'] ?? null) === 2;
        });
});

test('filament edit student form loads and updates level unlock states', function () {
    $admin = User::factory()->create();
    $student = Student::create([
        'name' => 'Admin Test Student',
        'slug' => 'admin-test-student-'.uniqid(),
        'avatar' => '👧',
    ]);

    expect($student->isLevelUnlocked(2))->toBeFalse();
    expect($student->isLevelUnlocked(3))->toBeFalse();

    Livewire::actingAs($admin)
        ->test(EditStudent::class, ['record' => $student->id])
        ->assertSchemaStateSet([
            'level_1_unlocked' => true,
            'level_2_unlocked' => false,
            'level_3_unlocked' => false,
            'level_4_unlocked' => false,
        ])
        ->set('data.level_2_unlocked', true)
        ->set('data.level_3_unlocked', true)
        ->call('save')
        ->assertHasNoErrors();

    $student->refresh();
    expect($student->isLevelUnlocked(2))->toBeTrue();
    expect($student->isLevelUnlocked(3))->toBeTrue();
    expect($student->isLevelUnlocked(4))->toBeFalse();
});
