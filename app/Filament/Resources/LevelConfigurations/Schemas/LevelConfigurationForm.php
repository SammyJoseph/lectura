<?php

namespace App\Filament\Resources\LevelConfigurations\Schemas;

use App\Models\LevelConfiguration;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class LevelConfigurationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('level')
                    ->label('Número de Nivel (1 a 4)')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(4)
                    ->required()
                    ->disabled(fn (?LevelConfiguration $record) => $record !== null),

                TextInput::make('name')
                    ->label('Nombre del Nivel')
                    ->required()
                    ->maxLength(100),

                TextInput::make('description')
                    ->label('Descripción')
                    ->maxLength(255),

                TextInput::make('required_stars')
                    ->label('Estrellas Requeridas para Desbloquear Siguiente Nivel')
                    ->numeric()
                    ->minValue(1)
                    ->default(100)
                    ->required()
                    ->helperText('Si un estudiante ya desbloqueó el siguiente nivel con una meta previa menor, mantendrá su desbloqueo de forma permanente.'),

                Toggle::make('is_active')
                    ->label('¿Nivel Activo?')
                    ->default(true),
            ]);
    }
}
