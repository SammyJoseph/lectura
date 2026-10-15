<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LevelConfiguration extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'level',
        'name',
        'description',
        'required_stars',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'level' => 'integer',
            'required_stars' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public static function getRequiredStarsForLevel(int $level, int $default = 100): int
    {
        return static::where('level', $level)->value('required_stars') ?? $default;
    }
}
