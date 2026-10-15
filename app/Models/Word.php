<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'level',
        'word',
        'emoji',
        'syllables',
        'phonetic',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'level' => 'integer',
            'syllables' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
