<?php

namespace App\Filament\Resources\Students\Pages;

use App\Filament\Resources\Students\StudentResource;
use App\Models\Student;
use Filament\Resources\Pages\CreateRecord;

class CreateStudent extends CreateRecord
{
    protected static string $resource = StudentResource::class;

    protected function afterCreate(): void
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
