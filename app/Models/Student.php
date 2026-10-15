<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $avatar
 * @property string|null $parent_name
 * @property string|null $parent_phone
 * @property bool $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, StudentLevelProgress> $levelProgress
 */
#[Fillable(['name', 'slug', 'avatar', 'parent_name', 'parent_phone', 'is_active'])]
class Student extends Model
{
    /**
     * Cantidad de estrellas requeridas para desbloquear el siguiente nivel.
     * Puedes cambiar este valor (por ejemplo a 300) y se actualizará en todo el juego.
     */
    public const TARGET_STARS_PER_LEVEL = 100;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return HasMany<StudentLevelProgress, $this>
     */
    public function levelProgress(): HasMany
    {
        return $this->hasMany(StudentLevelProgress::class);
    }

    /**
     * Initialize progress entries for levels 1 to 4 if they don't exist.
     */
    public function initializeLevels(): void
    {
        for ($level = 1; $level <= 4; $level++) {
            $this->levelProgress()->firstOrCreate(
                ['level' => $level],
                [
                    'stars' => 0,
                    'is_unlocked' => ($level === 1),
                ]
            );
        }
    }

    /**
     * Get or create progress for a specific level.
     */
    public function getProgressForLevel(int $level): StudentLevelProgress
    {
        return $this->levelProgress()->firstOrCreate(
            ['level' => $level],
            [
                'stars' => 0,
                'is_unlocked' => ($level === 1),
            ]
        );
    }

    /**
     * Add a star for a given level, checking if the next level unlocks at target stars.
     *
     * @return array{stars: int, unlockedNextLevel: bool, nextLevel: int|null}
     */
    public function addStar(int $level): array
    {
        $progress = $this->getProgressForLevel($level);
        $progress->increment('stars');
        $progress->refresh();

        $unlockedNextLevel = false;
        $nextLevel = null;

        $targetStars = LevelConfiguration::getRequiredStarsForLevel($level, self::TARGET_STARS_PER_LEVEL);

        if ($progress->stars >= $targetStars && $level < 4) {
            $nextLevel = $level + 1;
            $nextProgress = $this->getProgressForLevel($nextLevel);

            if (! $nextProgress->is_unlocked) {
                $nextProgress->update(['is_unlocked' => true]);
                $unlockedNextLevel = true;
            }

            if (! $progress->completed_at) {
                $progress->update(['completed_at' => now()]);
            }
        }

        return [
            'stars' => $progress->stars,
            'unlockedNextLevel' => $unlockedNextLevel,
            'nextLevel' => $nextLevel,
        ];
    }
}
