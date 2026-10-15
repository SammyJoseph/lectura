<?php

namespace App\Filament\Resources\Words\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class WordForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('level')
                    ->label('Nivel')
                    ->options([
                        1 => 'Nivel 1: Palabras Mágicas',
                        2 => 'Nivel 2: Silabario Aventurero',
                        3 => 'Nivel 3: Constructores de Palabras',
                        4 => 'Nivel 4: Pequeños Lectores',
                    ])
                    ->default(1)
                    ->required(),

                TextInput::make('word')
                    ->label('Palabra')
                    ->placeholder('Ej: GATO, MESA')
                    ->required()
                    ->maxLength(50)
                    ->extraInputAttributes(['style' => 'text-transform: uppercase;']),

                TextInput::make('emoji')
                    ->label('Emoji representativo')
                    ->placeholder('🐱, 🪑, 🍎')
                    ->required()
                    ->maxLength(10),

                TagsInput::make('syllables')
                    ->label('Sílabas separadas')
                    ->placeholder('Escribe sílaba y pulsa Enter (ej: ME, SA)')
                    ->helperText('Agrega cada sílaba en mayúsculas')
                    ->required(),

                TextInput::make('phonetic')
                    ->label('Fonética / Pronunciación (Opcional)')
                    ->placeholder('ej: gato, mesa')
                    ->maxLength(50),

                Toggle::make('is_active')
                    ->label('¿Activo en los ejercicios del juego?')
                    ->default(true),
            ]);
    }
}
