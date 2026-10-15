<?php

namespace App\Filament\Resources\Words\Pages;

use App\Filament\Resources\Words\WordResource;
use App\Models\LevelConfiguration;
use App\Models\Word;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListWords extends ListRecords
{
    protected static string $resource = WordResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    /**
     * @return array<string | int, Tab>
     */
    public function getTabs(): array
    {
        $levels = LevelConfiguration::query()->orderBy('level')->get();

        $tabs = [];

        foreach ($levels as $level) {
            $count = Word::query()->where('level', $level->level)->count();

            $tabs['nivel_'.$level->level] = Tab::make("Nivel {$level->level}: {$level->name}")
                ->badge($count)
                ->badgeColor($count > 0 ? 'success' : 'gray')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('level', $level->level));
        }

        return $tabs;
    }
}
