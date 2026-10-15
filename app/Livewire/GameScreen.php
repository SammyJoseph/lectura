<?php

namespace App\Livewire;

use App\Models\LevelConfiguration;
use App\Models\Student;
use App\Models\Word;
use Illuminate\View\View;
use Livewire\Component;

class GameScreen extends Component
{
    public int $studentId;

    public string $studentName = '';

    public string $studentAvatar = '👧';

    public string $studentSlug = '';

    /**
     * Active level: 0 = Adventure Level Menu, 1 = Playing Level 1
     */
    public int $activeLevel = 0;

    /**
     * @var array<int, array{level: int, name: string, stars: int, is_unlocked: bool, target: int, description: string, theme: string, shadow: string, border: string}>
     */
    public array $levels = [];

    public function mount(?Student $student = null): void
    {
        if (! $student) {
            $studentId = session('student_id');
            if ($studentId) {
                $student = Student::find($studentId);
            }
        }

        if ($student) {
            $student->initializeLevels();
            $this->studentId = $student->id;
            $this->studentName = $student->name;
            $this->studentAvatar = $student->avatar;
            $this->studentSlug = $student->slug;
            $this->loadLevels();
            $this->activeLevel = (int) session('active_level_'.$this->studentId, 0);
        }
    }

    public function loadLevels(): void
    {
        $student = Student::with('levelProgress')->find($this->studentId);
        if (! $student) {
            return;
        }

        $progressMap = $student->levelProgress->keyBy('level');
        $dbConfigs = LevelConfiguration::all()->keyBy('level');

        $themes = [
            1 => [
                'name' => 'Palabras Mágicas',
                'description' => 'Descubre palabras sencillas de 2 y 3 sílabas con objetos cotidianos',
                'theme' => 'from-emerald-50 to-teal-50 border-emerald-300 text-emerald-800',
                'shadow' => '#10b981',
                'border' => 'border-emerald-300',
            ],
            2 => [
                'name' => 'Silabario Aventurero',
                'description' => 'Aprende y reconoce el sonido de las sílabas',
                'theme' => 'from-indigo-50 to-purple-50 border-indigo-300 text-indigo-800',
                'shadow' => '#818cf8',
                'border' => 'border-indigo-300',
            ],
            3 => [
                'name' => 'Constructores de Palabras',
                'description' => 'Arma y completa palabras divertidas',
                'theme' => 'from-amber-50 to-orange-50 border-amber-300 text-amber-800',
                'shadow' => '#f59e0b',
                'border' => 'border-amber-300',
            ],
            4 => [
                'name' => 'Pequeños Lectores',
                'description' => 'Bases sólidas para continuar leyendo con éxito',
                'theme' => 'from-rose-50 to-pink-50 border-rose-300 text-rose-800',
                'shadow' => '#f43f5e',
                'border' => 'border-rose-300',
            ],
        ];

        $this->levels = [];

        for ($lvl = 1; $lvl <= 4; $lvl++) {
            $prog = $progressMap->get($lvl);
            $dbCfg = $dbConfigs->get($lvl);
            $themeCfg = $themes[$lvl] ?? $themes[1];

            $stars = $prog ? $prog->stars : 0;
            $isUnlocked = $prog ? (bool) $prog->is_unlocked : ($lvl === 1);
            $target = $dbCfg ? (int) $dbCfg->required_stars : Student::TARGET_STARS_PER_LEVEL;
            $name = $dbCfg ? $dbCfg->name : $themeCfg['name'];
            $description = $dbCfg && $dbCfg->description ? $dbCfg->description : $themeCfg['description'];

            $this->levels[$lvl] = [
                'level' => $lvl,
                'name' => $name,
                'description' => $description,
                'theme' => $themeCfg['theme'],
                'shadow' => $themeCfg['shadow'],
                'border' => $themeCfg['border'],
                'stars' => $stars,
                'is_unlocked' => $isUnlocked,
                'target' => $target,
            ];
        }
    }

    /**
     * @return array<int, array{id: int, word: string, emoji: string, syllables: array<string>, phonetic: string|null}>
     */
    public function getWordsForLevel(int $level): array
    {
        return Word::where('level', $level)
            ->where('is_active', true)
            ->get(['id', 'word', 'emoji', 'syllables', 'phonetic'])
            ->toArray();
    }

    public function selectLevel(int $level): void
    {
        $this->loadLevels();

        if (isset($this->levels[$level]) && $this->levels[$level]['is_unlocked']) {
            $this->activeLevel = $level;
            session(['active_level_'.$this->studentId => $level]);
            $this->dispatch('level-started', [
                'level' => $level,
                'stars' => $this->levels[$level]['stars'],
                'target' => $this->levels[$level]['target'],
                'words' => $this->getWordsForLevel($level),
            ]);
        }
    }

    public function returnToMenu(): void
    {
        $this->activeLevel = 0;
        session()->forget('active_level_'.$this->studentId);
        $this->loadLevels();
    }

    /**
     * Record a star won by the student in the given level.
     *
     * @return array{stars: int, unlockedNextLevel: bool, nextLevel: int|null}
     */
    public function recordStar(int $level): array
    {
        $student = Student::find($this->studentId);
        if (! $student) {
            return [
                'stars' => 0,
                'unlockedNextLevel' => false,
                'nextLevel' => null,
            ];
        }

        $result = $student->addStar($level);
        $this->loadLevels();

        return $result;
    }

    public function resetStars(int $level): void
    {
        $student = Student::find($this->studentId);
        if ($student) {
            $progress = $student->getProgressForLevel($level);
            $progress->update(['stars' => 0]);
            $this->loadLevels();
        }
    }

    public function render(): View
    {
        $activeWords = $this->activeLevel > 0 ? $this->getWordsForLevel($this->activeLevel) : [];

        return view('livewire.game-screen', [
            'activeWords' => $activeWords,
        ]);
    }
}
