<?php

use App\Console\Commands\ManageSyllableAudiosCommand;
use Database\Seeders\LevelConfigurationSeeder;
use Database\Seeders\WordSeeder;
use Illuminate\Support\Facades\File;

test('artisan audio syllables status command runs successfully and generates manifest', function () {
    $this->seed(LevelConfigurationSeeder::class);
    $this->seed(WordSeeder::class);

    $this->artisan('audio:syllables', ['--status' => true])
        ->expectsOutputToContain('Silabario total detectado en base de datos:')
        ->expectsOutputToContain('public/audio/syllables/')
        ->assertSuccessful();

    $manifestPath = public_path('audio/syllables/manifest.json');
    expect(File::exists($manifestPath))->toBeTrue();

    $content = json_decode(File::get($manifestPath), true);
    expect(is_array($content))->toBeTrue()
        ->and(in_array('co', $content))->toBeTrue()
        ->and(in_array('we', $content))->toBeTrue()
        ->and(in_array('ja', $content))->toBeTrue();
});

test('command correctly normalizes syllable slugs and phonetics', function () {
    $command = new ManageSyllableAudiosCommand;

    expect($command->slugify('CO'))->toBe('co')
        ->and($command->slugify('CÁN'))->toBe('can')
        ->and($command->slugify('DÍ'))->toBe('di')
        ->and($command->slugify('ÑA'))->toBe('ña');

    expect($command->resolvePhonetic('CO', null))->toBe('ko')
        ->and($command->resolvePhonetic('CA', null))->toBe('ka')
        ->and($command->resolvePhonetic('CU', null))->toBe('ku')
        ->and($command->resolvePhonetic('JA', null))->toBe('já')
        ->and($command->resolvePhonetic('WE', null))->toBe('güe')
        ->and($command->resolvePhonetic('SA', null))->toBe('sá');
});
