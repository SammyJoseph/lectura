<?php

namespace App\Filament\Resources\LevelConfigurations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\TextInputColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class LevelConfigurationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('level')
                    ->label('Nivel')
                    ->badge()
                    ->sortable()
                    ->formatStateUsing(fn (int $state): string => 'Nivel '.$state),

                TextColumn::make('name')
                    ->label('Nombre del Nivel')
                    ->weight('bold')
                    ->searchable(),

                TextColumn::make('description')
                    ->label('Descripción')
                    ->limit(40),

                TextInputColumn::make('required_stars')
                    ->label('Estrellas Meta ⭐')
                    ->rules(['required', 'numeric', 'min:1'])
                    ->sortable(),

                ToggleColumn::make('is_active')
                    ->label('Activo'),
            ])
            ->defaultSort('level', 'asc')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
