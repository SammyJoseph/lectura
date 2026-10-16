<?php

namespace App\Filament\Resources\Students\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class StudentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
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
                    ->default(true),
            ]);
    }
}
