<?php

namespace App\Filament\Resources\LevelConfigurations;

use App\Filament\Resources\LevelConfigurations\Pages\CreateLevelConfiguration;
use App\Filament\Resources\LevelConfigurations\Pages\EditLevelConfiguration;
use App\Filament\Resources\LevelConfigurations\Pages\ListLevelConfigurations;
use App\Filament\Resources\LevelConfigurations\Schemas\LevelConfigurationForm;
use App\Filament\Resources\LevelConfigurations\Tables\LevelConfigurationsTable;
use App\Models\LevelConfiguration;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class LevelConfigurationResource extends Resource
{
    protected static ?string $model = LevelConfiguration::class;

    protected static ?string $navigationLabel = 'Metas de Niveles';

    protected static ?string $modelLabel = 'Configuración de Nivel';

    protected static ?string $pluralModelLabel = 'Configuraciones de Niveles';

    protected static string|UnitEnum|null $navigationGroup = 'Configuración';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSparkles;

    public static function form(Schema $schema): Schema
    {
        return LevelConfigurationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LevelConfigurationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLevelConfigurations::route('/'),
            'create' => CreateLevelConfiguration::route('/create'),
            'edit' => EditLevelConfiguration::route('/{record}/edit'),
        ];
    }
}
