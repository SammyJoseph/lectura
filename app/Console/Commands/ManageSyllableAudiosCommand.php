<?php

namespace App\Console\Commands;

use App\Models\Word;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ManageSyllableAudiosCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'audio:syllables
                            {--status : Muestra el estado de cobertura de las sílabas}
                            {--generate : Descarga y genera los archivos MP3 faltantes}
                            {--force : Regenera todos los archivos MP3 aunque ya existan}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Audita, genera y sincroniza los archivos de audio MP3 para todas las sílabas del juego';

    /**
     * Diccionario fonético seguro para síntesis de audio de sílabas aisladas.
     *
     * @var array<string, string>
     */
    protected array $phoneticMap = [
        // Familia C fuerte (k evita siglas CA/California, CO/Colombia/Company, CU/see you)
        'ca' => 'ka',
        'co' => 'ko',
        'cu' => 'ku',
        'can' => 'kán',
        'car' => 'kar',
        'cam' => 'kam',
        'cua' => 'kua',

        // Familia Q
        'que' => 'ke',
        'qui' => 'ki',

        // Familia S (sá evita sigla S.A. Sociedad Anónima)
        'sa' => 'sá',

        // Familia J (já evita sigla J.A. Junta / Juez Árbitro)
        'ja' => 'já',

        // Familia W (fuerza pronunciación en español, evita pronombres en inglés)
        'wa' => 'gua',
        'we' => 'güe',
        'wi' => 'güi',
        'wo' => 'guo',
        'wu' => 'gu',

        // Familia H (hache muda, sin tildes para evitar "A con acento")
        'ha' => 'a',
        'he' => 'e',
        'hi' => 'i',
        'ho' => 'o',
        'hu' => 'u',
        'hue' => 'ue',

        // Vocales individuales aisladas
        'a' => 'a',
        'e' => 'e',
        'i' => 'i',
        'o' => 'o',
        'u' => 'u',

        // Dígrafos y casos con coda
        'rra' => 'ra',
        'rre' => 're',
        'rri' => 'ri',
        'rro' => 'ro',
        'rru' => 'ru',
        'rroz' => 'ros',
        'zza' => 'sa',
        'vion' => 'bión',
        'mion' => 'mión',
        'gui' => 'gi',
        'gue' => 'ge',
    ];

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $audioDir = public_path('audio/syllables');
        File::ensureDirectoryExists($audioDir);

        $syllables = $this->collectAllSyllables();
        $this->info('Silabario total detectado en base de datos: '.count($syllables).' sílabas.');

        $shouldGenerate = (bool) $this->option('generate');
        $force = (bool) $this->option('force');

        if ($shouldGenerate) {
            $this->generateMissingAudios($syllables, $audioDir, $force);
        }

        $manifest = $this->updateManifest($audioDir);

        $this->displaySummary($syllables, $manifest);

        return self::SUCCESS;
    }

    /**
     * Recolecta todas las sílabas del Nivel 1 y Nivel 2.
     *
     * @return array<string, array{original: string, slug: string, phonetic: string}>
     */
    public function collectAllSyllables(): array
    {
        $result = [];

        // 1. Sílabas de Nivel 1
        $level1Words = Word::where('level', 1)->get(['word', 'phonetic']);
        foreach ($level1Words as $w) {
            $raw = (string) $w->word;
            $slug = $this->slugify($raw);
            if ($slug === '') {
                continue;
            }
            $result[$slug] = [
                'original' => $raw,
                'slug' => $slug,
                'phonetic' => $this->resolvePhonetic($raw, $w->phonetic),
            ];
        }

        // 2. Sílabas de palabras de Nivel 2
        $level2Words = Word::where('level', 2)->get(['word', 'syllables']);
        foreach ($level2Words as $w) {
            $syllables = is_array($w->syllables) ? $w->syllables : [];
            foreach ($syllables as $syl) {
                $raw = trim((string) $syl);
                $slug = $this->slugify($raw);
                if ($slug === '' || isset($result[$slug])) {
                    continue;
                }
                $result[$slug] = [
                    'original' => $raw,
                    'slug' => $slug,
                    'phonetic' => $this->resolvePhonetic($raw, null),
                ];
            }
        }

        ksort($result);

        return $result;
    }

    /**
     * Normaliza la sílaba a slug minúsculo sin tildes para el nombre de archivo.
     */
    public function slugify(string $syllable): string
    {
        $clean = Str::lower(trim($syllable));
        $clean = str_replace(
            ['á', 'é', 'í', 'ó', 'ú', 'ü'],
            ['a', 'e', 'i', 'o', 'u', 'u'],
            $clean
        );
        $slug = preg_replace('/[^a-z0-9ñ]/u', '', $clean) ?? '';

        return $slug;
    }

    /**
     * Determina el texto fonético óptimo para la síntesis de audio.
     */
    public function resolvePhonetic(string $rawSyllable, ?string $explicitPhonetic): string
    {
        $slug = $this->slugify($rawSyllable);
        if (isset($this->phoneticMap[$slug])) {
            return $this->phoneticMap[$slug];
        }

        if ($explicitPhonetic !== null && trim($explicitPhonetic) !== '') {
            $cleanExplicit = Str::lower(trim($explicitPhonetic));
            if (isset($this->phoneticMap[$cleanExplicit])) {
                return $this->phoneticMap[$cleanExplicit];
            }

            return $cleanExplicit;
        }

        return Str::lower(trim($rawSyllable));
    }

    /**
     * Genera y descarga los archivos MP3 para las sílabas.
     *
     * @param  array<string, array{original: string, slug: string, phonetic: string}>  $syllables
     */
    protected function generateMissingAudios(array $syllables, string $audioDir, bool $force): void
    {
        $targets = [];
        foreach ($syllables as $slug => $data) {
            $filePath = $audioDir.DIRECTORY_SEPARATOR.$slug.'.mp3';
            if ($force || ! File::exists($filePath) || File::size($filePath) === 0) {
                $targets[$slug] = $data;
            }
        }

        if (empty($targets)) {
            $this->info('Todos los archivos de audio ya existen. No hay sílabas pendientes.');

            return;
        }

        $this->info('Generando '.count($targets).' archivos de audio MP3...');
        $bar = $this->output->createProgressBar(count($targets));
        $bar->start();

        foreach ($targets as $slug => $data) {
            $filePath = $audioDir.DIRECTORY_SEPARATOR.$slug.'.mp3';
            $success = $this->fetchAudioFile($data['phonetic'], $filePath);

            if (! $success) {
                $this->newLine();
                $this->warn("No se pudo descargar el audio para la sílaba: {$data['original']} ({$slug})");
            }

            // Pequeña pausa de 80ms para respetar el servicio y evitar bloqueos de red
            usleep(80000);
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
    }

    /**
     * Descarga el archivo de audio MP3 desde el servicio TTS con cabeceras de navegador.
     */
    protected function fetchAudioFile(string $text, string $destinationPath): bool
    {
        try {
            $url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=es&client=tw-ob&q='.urlencode($text);
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer' => 'https://translate.google.com/',
            ])->timeout(8)->get($url);

            if ($response->successful() && strlen($response->body()) > 500) {
                File::put($destinationPath, $response->body());

                return true;
            }
        } catch (\Throwable $e) {
            // Silencioso; continúa con el siguiente
        }

        return false;
    }

    /**
     * Escanea el directorio de audios y actualiza el manifiesto JSON.
     *
     * @return array<int, string> Lista de slugs disponibles
     */
    public function updateManifest(string $audioDir): array
    {
        $manifestPath = $audioDir.DIRECTORY_SEPARATOR.'manifest.json';
        $files = File::glob($audioDir.DIRECTORY_SEPARATOR.'*.mp3');

        $availableSlugs = [];
        foreach ($files as $file) {
            $slug = pathinfo($file, PATHINFO_FILENAME);
            if ($slug !== '' && File::size($file) > 0) {
                $availableSlugs[] = Str::lower($slug);
            }
        }

        sort($availableSlugs);
        File::put($manifestPath, json_encode($availableSlugs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        return $availableSlugs;
    }

    /**
     * Muestra una tabla resumen del estado de los audios.
     *
     * @param  array<string, array{original: string, slug: string, phonetic: string}>  $syllables
     * @param  array<int, string>  $manifest
     */
    protected function displaySummary(array $syllables, array $manifest): void
    {
        $manifestSet = array_flip($manifest);
        $total = count($syllables);
        $availableCount = 0;
        $missing = [];

        foreach ($syllables as $slug => $data) {
            if (isset($manifestSet[$slug])) {
                $availableCount++;
            } else {
                $missing[] = $data['original'];
            }
        }

        $coverage = $total > 0 ? round(($availableCount / $total) * 100, 1) : 0;

        $this->table(
            ['Métrica', 'Valor'],
            [
                ['Total sílabas en Base de Datos (N1 + N2)', $total],
                ['Audios MP3 disponibles en public/audio/syllables/', $availableCount],
                ['Audios faltantes', count($missing)],
                ['Cobertura de audios locales', "{$coverage}%"],
            ]
        );

        if (! empty($missing)) {
            $preview = array_slice($missing, 0, 15);
            $more = count($missing) > 15 ? ' (+ '.(count($missing) - 15).' más)' : '';
            $this->warn('Sílabas pendientes de audio: '.implode(', ', $preview).$more);
            $this->line('👉 Para generarlas automáticamente ejecuta: <info>php artisan audio:syllables --generate</info>');
        } else {
            $this->info('✅ ¡Cobertura completa! El 100% de las sílabas cuenta con audio local MP3.');
        }
    }
}
