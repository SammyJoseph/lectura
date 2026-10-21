<?php

namespace App\Filament\Resources\Students\Pages;

use App\Filament\Resources\Students\StudentResource;
use App\Models\Student;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditStudent extends EditRecord
{
    protected static string $resource = StudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeFill(array $data): array
    {
        /** @var Student $student */
        $student = $this->getRecord();

        for ($lvl = 1; $lvl <= 4; $lvl++) {
            $data["level_{$lvl}_unlocked"] = $student->isLevelUnlocked($lvl);
        }

        return $data;
    }

    protected function afterSave(): void
    {
        /** @var Student $student */
        $student = $this->getRecord();

        for ($lvl = 1; $lvl <= 4; $lvl++) {
            $key = "level_{$lvl}_unlocked";
            if (isset($this->data[$key])) {
                $student->setLevelUnlocked($lvl, (bool) $this->data[$key]);
            }
        }
    }
}
