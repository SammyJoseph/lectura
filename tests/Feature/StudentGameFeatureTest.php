<?php

use App\Filament\Resources\Words\Pages\ListWords;
use App\Livewire\GameScreen;
use App\Models\LevelConfiguration;
use App\Models\Student;
use Database\Seeders\LevelConfigurationSeeder;
use Database\Seeders\WordSeeder;
use Livewire\Livewire;

test('unauthenticated visitor to root sees private welcome page with WhatsApp link 51971893196', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertSee('51971893196');
    $response->assertSee('Aprende a Leer y Escribir');
    $response->assertSee('Pedir cuenta por WhatsApp');
    $response->assertDontSee('Contacto directo');
    $response->assertDontSee('¿Ya tienes un enlace?');
});

test('visitor accessing student slug without token redirects with error', function () {
    $student = Student::firstOrCreate(
        ['slug' => 'test-estudiante'],
        [
            'name' => 'Estudiante de Prueba',
            'access_token' => 'token-prueba-123',
            'avatar' => '🧒',
        ]
    );

    $response = $this->get('/test-estudiante');

    $response->assertRedirect('/');
    $response->assertSessionHas('error');
    $this->assertNull(session('student_id'));
});

test('visitor accessing valid student slug and token logs in and redirects to home', function () {
    $student = Student::firstOrCreate(
        ['slug' => 'test-estudiante-token'],
        [
            'name' => 'Estudiante Token',
            'access_token' => 'seguro456',
            'avatar' => '🧒',
        ]
    );

    $response = $this->get('/test-estudiante-token/seguro456');

    $response->assertRedirect('/');
    $this->assertEquals($student->id, session('student_id'));
    $response->assertCookie('student_slug', 'test-estudiante-token');
    $response->assertCookie('student_token', 'seguro456');
});

test('visitor accessing valid student slug with wrong token redirects with error', function () {
    $student = Student::firstOrCreate(
        ['slug' => 'test-estudiante-wrong'],
        [
            'name' => 'Estudiante Wrong Token',
            'access_token' => 'clave-correcta',
            'avatar' => '🧒',
        ]
    );

    $response = $this->get('/test-estudiante-wrong/clave-incorrecta');

    $response->assertRedirect('/');
    $response->assertSessionHas('error');
    $this->assertNull(session('student_id'));
});

test('invalid student slug redirects to home with error', function () {
    $response = $this->get('/slug-que-no-existe-xyz');

    $response->assertRedirect('/');
    $response->assertSessionHas('error');
});

test('authenticated student visits home and sees adventure levels menu', function () {
    $student = Student::firstOrCreate(
        ['slug' => 'arya-test'],
        [
            'name' => 'Arya Test',
            'avatar' => '👧',
        ]
    );
    $student->initializeLevels();

    $response = $this->withSession(['student_id' => $student->id])->get('/');

    $response->assertStatus(200);
    $response->assertSee('Arya Test');
    $response->assertSee('Palabras Mágicas');
    $response->assertSee('Silabario Aventurero');
    $response->assertSee('Constructores de Palabras');
    $response->assertSee('Pequeños Lectores');
});

test('addStar method increments stars and unlocks Level 2 at 100 stars', function () {
    $student = Student::create([
        'name' => 'Lucas Estrella',
        'slug' => 'lucas-estrella-'.uniqid(),
        'avatar' => '👦',
    ]);
    $student->initializeLevels();

    $target = Student::TARGET_STARS_PER_LEVEL;

    // Add target - 1 stars
    for ($i = 0; $i < $target - 1; $i++) {
        $student->addStar(1);
    }

    $progressLevel1 = $student->getProgressForLevel(1);
    $progressLevel2 = $student->getProgressForLevel(2);

    expect($progressLevel1->stars)->toBe($target - 1);
    expect($progressLevel2->is_unlocked)->toBeFalse();

    // Final star unlocks level 2
    $result = $student->addStar(1);

    expect($result['stars'])->toBe($target);
    expect($result['unlockedNextLevel'])->toBeTrue();
    expect($result['nextLevel'])->toBe(2);

    $progressLevel2->refresh();
    expect($progressLevel2->is_unlocked)->toBeTrue();
});

test('livewire game screen component can record stars and select levels', function () {
    $student = Student::create([
        'name' => 'Sofía Demo',
        'slug' => 'sofia-demo-'.uniqid(),
        'avatar' => '👧',
    ]);
    $student->initializeLevels();

    Livewire::test(GameScreen::class, ['student' => $student])
        ->assertSee('Sofía Demo')
        ->assertSee('Palabras Mágicas')
        ->assertSee('Pequeños Lectores')
        ->call('selectLevel', 1)
        ->assertSet('activeLevel', 1)
        ->call('recordStar', 1)
        ->assertOk()
        ->call('returnToMenu')
        ->assertSet('activeLevel', 0);
});

test('student logout clears session and cookie', function () {
    $response = $this->withSession(['student_id' => 1])
        ->withCookie('student_slug', 'amelie-taboada')
        ->withCookie('student_token', 'amelie2026')
        ->get('/salir');

    $response->assertRedirect('/');
    $this->assertNull(session('student_id'));
});

test('game screen restores activeLevel from session when refreshing page', function () {
    $student = Student::create([
        'name' => 'Mateo Nivel',
        'slug' => 'mateo-nivel-'.uniqid(),
        'avatar' => '👦',
    ]);
    $student->initializeLevels();

    session(['active_level_'.$student->id => 1]);

    Livewire::test(GameScreen::class, ['student' => $student])
        ->assertSet('activeLevel', 1)
        ->call('recordStar', 1)
        ->assertOk()
        ->call('resetStars', 1)
        ->assertOk();

    expect($student->getProgressForLevel(1)->refresh()->stars)->toBe(0);
});

test('level unlocks use dynamic required_stars from LevelConfiguration', function () {
    $student = Student::create([
        'name' => 'Valeria Meta',
        'slug' => 'valeria-meta-'.uniqid(),
        'avatar' => '👧',
    ]);
    $student->initializeLevels();

    // Set level 1 requirement to 5 stars
    LevelConfiguration::updateOrCreate(
        ['level' => 1],
        ['name' => 'Nivel 1 Test', 'required_stars' => 5, 'is_active' => true]
    );

    for ($i = 0; $i < 4; $i++) {
        $student->addStar(1);
    }
    expect($student->getProgressForLevel(2)->is_unlocked)->toBeFalse();

    // 5th star unlocks level 2
    $result = $student->addStar(1);
    expect($result['unlockedNextLevel'])->toBeTrue();
    expect($student->getProgressForLevel(2)->refresh()->is_unlocked)->toBeTrue();
});

test('unlocked levels remain unlocked even if required_stars is subsequently increased', function () {
    $student = Student::create([
        'name' => 'Diego Permanente',
        'slug' => 'diego-permanente-'.uniqid(),
        'avatar' => '👦',
    ]);
    $student->initializeLevels();

    // Unlock level 2 with 3 stars
    LevelConfiguration::updateOrCreate(
        ['level' => 1],
        ['name' => 'Nivel 1 Test', 'required_stars' => 3, 'is_active' => true]
    );

    for ($i = 0; $i < 3; $i++) {
        $student->addStar(1);
    }
    expect($student->getProgressForLevel(2)->refresh()->is_unlocked)->toBeTrue();

    // Now increase requirement to 300 stars
    LevelConfiguration::updateOrCreate(
        ['level' => 1],
        ['name' => 'Nivel 1 Test', 'required_stars' => 300, 'is_active' => true]
    );

    // Student adds another star (now at 4 stars, less than 300)
    $student->addStar(1);

    // Level 2 MUST remain unlocked forever
    expect($student->getProgressForLevel(2)->refresh()->is_unlocked)->toBeTrue();
});

test('words can be retrieved for level and passed to game arena', function () {
    $this->seed(WordSeeder::class);

    $student = Student::create([
        'name' => 'Camila Palabras',
        'slug' => 'camila-palabras-'.uniqid(),
        'avatar' => '👧',
    ]);
    $student->initializeLevels();

    Livewire::test(GameScreen::class, ['student' => $student])
        ->call('selectLevel', 1)
        ->assertDispatched('level-started', function ($name, $params) {
            $data = is_array($params) && isset($params[0]) && is_array($params[0]) ? $params[0] : $params;

            return ($data['level'] ?? null) === 1
                && isset($data['words'])
                && count($data['words']) >= 100;
        });
});

test('filament list words page provides tabs per level with word counts', function () {
    $this->seed(LevelConfigurationSeeder::class);
    $this->seed(WordSeeder::class);

    $page = new ListWords;
    $tabs = $page->getTabs();

    expect($tabs)->toHaveKeys(['nivel_1', 'nivel_2', 'nivel_3', 'nivel_4']);
    expect((int) $tabs['nivel_1']->getBadge())->toBeGreaterThanOrEqual(100);
    expect((int) $tabs['nivel_2']->getBadge())->toBeGreaterThanOrEqual(100);
    expect((int) $tabs['nivel_3']->getBadge())->toBe(0);
});

test('words can be retrieved for level 2 and passed to game arena', function () {
    $this->seed(WordSeeder::class);

    $student = Student::create([
        'name' => 'Camila Nivel 2',
        'slug' => 'camila-nivel-2-'.uniqid(),
        'avatar' => '👧',
    ]);
    $student->initializeLevels();
    $student->getProgressForLevel(2)->update(['is_unlocked' => true]);

    Livewire::test(GameScreen::class, ['student' => $student])
        ->call('selectLevel', 2)
        ->assertDispatched('level-started', function ($name, $params) {
            $data = is_array($params) && isset($params[0]) && is_array($params[0]) ? $params[0] : $params;

            return ($data['level'] ?? null) === 2
                && isset($data['words'])
                && count($data['words']) >= 100;
        });
});
