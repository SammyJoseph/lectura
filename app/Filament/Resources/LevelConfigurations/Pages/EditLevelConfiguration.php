<?php

namespace App\Filament\Resources\LevelConfigurations\Pages;

use App\Filament\Resources\LevelConfigurations\LevelConfigurationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLevelConfiguration extends EditRecord
{
    protected static string $resource = LevelConfigurationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
