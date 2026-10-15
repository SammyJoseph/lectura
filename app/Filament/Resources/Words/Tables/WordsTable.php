<?php

namespace App\Filament\Resources\Words\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class WordsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('emoji')
                    ->label('Emoji')
                    ->size('xl'),

                TextColumn::make('word')
                    ->label('Palabra')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('syllables')
                    ->label('Sílabas')
                    ->badge()
                    ->color('info'),

                TextColumn::make('level')
                    ->label('Nivel')
                    ->badge()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->formatStateUsing(fn (int $state): string => 'Nivel '.$state),

                TextColumn::make('phonetic')
                    ->label('Fonética')
                    ->toggleable(isToggledHiddenByDefault: true),

                ToggleColumn::make('is_active')
                    ->label('Activo'),
            ])
            ->defaultSort('id', 'desc')
            ->filters([
                //
            ])
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
