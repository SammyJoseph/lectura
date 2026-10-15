<?php

namespace App\Filament\Resources\Students\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class StudentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('avatar')
                    ->label('Avatar')
                    ->size('xl'),

                TextColumn::make('name')
                    ->label('Estudiante')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('slug')
                    ->label('Slug de Acceso')
                    ->copyable()
                    ->copyMessage('¡Enlace de acceso copiado!')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state): string => '/'.$state),

                TextColumn::make('stars')
                    ->label('Estrellas ⭐')
                    ->state(fn ($record): int => (int) $record->levelProgress()->sum('stars'))
                    ->badge()
                    ->color('warning'),

                TextColumn::make('parent_name')
                    ->label('Padre / Tutor')
                    ->toggleable(),

                TextColumn::make('parent_phone')
                    ->label('WhatsApp')
                    ->toggleable(),

                ToggleColumn::make('is_active')
                    ->label('Activo'),
            ])
            ->defaultSort('name', 'asc')
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
