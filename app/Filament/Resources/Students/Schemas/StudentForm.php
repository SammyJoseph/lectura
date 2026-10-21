<?php

namespace App\Filament\Resources\Students\Schemas;

use App\Models\Student;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class StudentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Información del Estudiante')
                    ->components([
                        Grid::make(2)->components([
                            TextInput::make('name')
                                ->label('Nombre del Estudiante')
                                ->placeholder('Ej: Amelie Taboada')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(function (?string $state, callable $set, string $operation) {
                                    if ($operation === 'create' && $state) {
                                        $set('slug', Str::slug($state));
                                    }
                                }),

                            TextInput::make('slug')
                                ->label('Slug de Acceso')
                                ->helperText('Identificador en la URL (ej: amelie-taboada)')
                                ->required()
                                ->unique(ignoreRecord: true),

                            TextInput::make('access_token')
                                ->label('Token Secreto de Acceso')
                                ->helperText('Código corto de 4 caracteres (ej: 7a2k) que previene accesos no deseados.')
                                ->default(fn () => Str::lower(Str::random(4)))
                                ->maxLength(20)
                                ->required()
                                ->unique(ignoreRecord: true),

                            Select::make('avatar')
                                ->label('Avatar del Estudiante')
                                ->options([
                                    '👧' => '👧 Niña',
                                    '👦' => '👦 Niño',
                                    '🦁' => '🦁 León',
                                    '🐼' => '🐼 Panda',
                                    '🦄' => '🦄 Unicornio',
                                    '🚀' => '🚀 Cohete',
                                    '⭐' => '⭐ Estrella',
                                ])
                                ->default('👧')
                                ->required(),

                            TextInput::make('parent_name')
                                ->label('Nombre de Padre/Madre/Tutor')
                                ->maxLength(100),

                            TextInput::make('parent_phone')
                                ->label('Teléfono / WhatsApp del Padre/Madre')
                                ->tel()
                                ->maxLength(30),

                            Toggle::make('is_active')
                                ->label('¿Estudiante Activo?')
                                ->default(true)
                                ->columnSpanFull(),
                        ]),
                    ]),

                Section::make('Desbloqueo de Niveles')
                    ->description('Cada alumno desbloquea los niveles según su progreso (comienza con el Nivel 1 desbloqueado). Como administrador, puedes activar o desactivar manualmente cualquier nivel de forma independiente.')
                    ->components([
                        Grid::make(2)->components(
                            static::buildLevelToggles()
                        ),
                    ]),
            ]);
    }

    /**
     * @return array<int, Toggle>
     */
    protected static function buildLevelToggles(): array
    {
        $defaultNames = [
            1 => 'Silabario Aventurero',
            2 => 'Palabras Mágicas',
            3 => 'Constructores de Palabras',
            4 => 'Pequeños Lectores',
        ];

        $toggles = [];

        for ($lvl = 1; $lvl <= 4; $lvl++) {
            $defaultName = $defaultNames[$lvl] ?? "Nivel {$lvl}";

            $toggles[] = Toggle::make("level_{$lvl}_unlocked")
                ->label("Nivel {$lvl}: {$defaultName}")
                ->default($lvl === 1)
                ->dehydrated(false)
                ->helperText(function (?Student $record) use ($lvl): string {
                    if (! $record) {
                        return $lvl === 1
                            ? 'Desbloqueado por defecto al registrar.'
                            : 'Bloqueado por defecto.';
                    }

                    $prog = $record->getProgressForLevel($lvl);
                    $stars = $prog ? $prog->stars : 0;
                    $isUnlocked = $prog ? (bool) $prog->is_unlocked : ($lvl === 1);

                    return $isUnlocked
                        ? "🔓 Desbloqueado ({$stars} ⭐)"
                        : "🔒 Bloqueado ({$stars} ⭐)";
                })
                ->loadStateFromRelationshipsUsing(function (Toggle $component, ?Student $record) use ($lvl): void {
                    if (! $record) {
                        $component->state($lvl === 1);

                        return;
                    }

                    $component->state($record->isLevelUnlocked($lvl));
                })
                ->saveRelationshipsUsing(function (Toggle $component, ?Student $record) use ($lvl): void {
                    if ($record) {
                        $record->setLevelUnlocked($lvl, (bool) $component->getState());
                    }
                });
        }

        return $toggles;
    }
}
