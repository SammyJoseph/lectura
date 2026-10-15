<?php

namespace App\Filament\Resources\LevelConfigurations\Pages;

use App\Filament\Resources\LevelConfigurations\LevelConfigurationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLevelConfigurations extends ListRecords
{
    protected static string $resource = LevelConfigurationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
