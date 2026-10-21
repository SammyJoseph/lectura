<?php

namespace Database\Seeders;

use App\Models\Word;
use Illuminate\Database\Seeder;

class Level1SyllableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Seeds the complete direct syllabary for Level 1 (Discrimination mode, pure text).
     */
    public function run(): void
    {
        Word::where('level', 1)->delete();

        $syllableFamilies = [
            'B' => [
                ['word' => 'BA', 'phonetic' => 'ba'],
                ['word' => 'BE', 'phonetic' => 'be'],
                ['word' => 'BI', 'phonetic' => 'bi'],
                ['word' => 'BO', 'phonetic' => 'bo'],
                ['word' => 'BU', 'phonetic' => 'bu'],
            ],
            'C' => [
                ['word' => 'CA', 'phonetic' => 'ka'],
                ['word' => 'CE', 'phonetic' => 'ce'],
                ['word' => 'CI', 'phonetic' => 'sí'],
                ['word' => 'CO', 'phonetic' => 'ko'],
                ['word' => 'CU', 'phonetic' => 'ku'],
            ],
            'CH' => [
                ['word' => 'CHA', 'phonetic' => 'cha'],
                ['word' => 'CHE', 'phonetic' => 'che'],
                ['word' => 'CHI', 'phonetic' => 'chi'],
                ['word' => 'CHO', 'phonetic' => 'cho'],
                ['word' => 'CHU', 'phonetic' => 'chu'],
            ],
            'D' => [
                ['word' => 'DA', 'phonetic' => 'da'],
                ['word' => 'DE', 'phonetic' => 'de'],
                ['word' => 'DI', 'phonetic' => 'di'],
                ['word' => 'DO', 'phonetic' => 'do'],
                ['word' => 'DU', 'phonetic' => 'du'],
            ],
            'F' => [
                ['word' => 'FA', 'phonetic' => 'fa'],
                ['word' => 'FE', 'phonetic' => 'fe'],
                ['word' => 'FI', 'phonetic' => 'fi'],
                ['word' => 'FO', 'phonetic' => 'fo'],
                ['word' => 'FU', 'phonetic' => 'fu'],
            ],
            'G' => [
                ['word' => 'GA', 'phonetic' => 'ga'],
                ['word' => 'GE', 'phonetic' => 'je'],
                ['word' => 'GI', 'phonetic' => 'ji'],
                ['word' => 'GO', 'phonetic' => 'go'],
                ['word' => 'GU', 'phonetic' => 'gu'],
                ['word' => 'GUE', 'phonetic' => 'ge'],
                ['word' => 'GUI', 'phonetic' => 'gi'],
            ],
            'H' => [
                ['word' => 'HA', 'phonetic' => 'a'],
                ['word' => 'HE', 'phonetic' => 'e'],
                ['word' => 'HI', 'phonetic' => 'i'],
                ['word' => 'HO', 'phonetic' => 'o'],
                ['word' => 'HU', 'phonetic' => 'u'],
            ],
            'J' => [
                ['word' => 'JA', 'phonetic' => 'já'],
                ['word' => 'JE', 'phonetic' => 'je'],
                ['word' => 'JI', 'phonetic' => 'ji'],
                ['word' => 'JO', 'phonetic' => 'jo'],
                ['word' => 'JU', 'phonetic' => 'ju'],
            ],
            'K' => [
                ['word' => 'KA', 'phonetic' => 'ka'],
                ['word' => 'KE', 'phonetic' => 'ke'],
                ['word' => 'KI', 'phonetic' => 'ki'],
                ['word' => 'KO', 'phonetic' => 'ko'],
                ['word' => 'KU', 'phonetic' => 'ku'],
            ],
            'L' => [
                ['word' => 'LA', 'phonetic' => 'la'],
                ['word' => 'LE', 'phonetic' => 'le'],
                ['word' => 'LI', 'phonetic' => 'li'],
                ['word' => 'LO', 'phonetic' => 'lo'],
                ['word' => 'LU', 'phonetic' => 'lu'],
            ],
            'LL' => [
                ['word' => 'LLA', 'phonetic' => 'lla'],
                ['word' => 'LLE', 'phonetic' => 'lle'],
                ['word' => 'LLI', 'phonetic' => 'lli'],
                ['word' => 'LLO', 'phonetic' => 'llo'],
                ['word' => 'LLU', 'phonetic' => 'llu'],
            ],
            'M' => [
                ['word' => 'MA', 'phonetic' => 'ma'],
                ['word' => 'ME', 'phonetic' => 'me'],
                ['word' => 'MI', 'phonetic' => 'mi'],
                ['word' => 'MO', 'phonetic' => 'mo'],
                ['word' => 'MU', 'phonetic' => 'mu'],
            ],
            'N' => [
                ['word' => 'NA', 'phonetic' => 'na'],
                ['word' => 'NE', 'phonetic' => 'ne'],
                ['word' => 'NI', 'phonetic' => 'ni'],
                ['word' => 'NO', 'phonetic' => 'no'],
                ['word' => 'NU', 'phonetic' => 'nu'],
            ],
            'Ñ' => [
                ['word' => 'ÑA', 'phonetic' => 'ña'],
                ['word' => 'ÑE', 'phonetic' => 'ñe'],
                ['word' => 'ÑI', 'phonetic' => 'ñi'],
                ['word' => 'ÑO', 'phonetic' => 'ño'],
                ['word' => 'ÑU', 'phonetic' => 'ñu'],
            ],
            'P' => [
                ['word' => 'PA', 'phonetic' => 'pa'],
                ['word' => 'PE', 'phonetic' => 'pe'],
                ['word' => 'PI', 'phonetic' => 'pi'],
                ['word' => 'PO', 'phonetic' => 'po'],
                ['word' => 'PU', 'phonetic' => 'pu'],
            ],
            'Q' => [
                ['word' => 'QUE', 'phonetic' => 'ke'],
                ['word' => 'QUI', 'phonetic' => 'ki'],
            ],
            'R' => [
                ['word' => 'RA', 'phonetic' => 'ra'],
                ['word' => 'RE', 'phonetic' => 're'],
                ['word' => 'RI', 'phonetic' => 'ri'],
                ['word' => 'RO', 'phonetic' => 'ro'],
                ['word' => 'RU', 'phonetic' => 'ru'],
            ],
            'S' => [
                ['word' => 'SA', 'phonetic' => 'sá'],
                ['word' => 'SE', 'phonetic' => 'se'],
                ['word' => 'SI', 'phonetic' => 'sí'],
                ['word' => 'SO', 'phonetic' => 'so'],
                ['word' => 'SU', 'phonetic' => 'su'],
            ],
            'T' => [
                ['word' => 'TA', 'phonetic' => 'ta'],
                ['word' => 'TE', 'phonetic' => 'te'],
                ['word' => 'TI', 'phonetic' => 'ti'],
                ['word' => 'TO', 'phonetic' => 'to'],
                ['word' => 'TU', 'phonetic' => 'tu'],
            ],
            'V' => [
                ['word' => 'VA', 'phonetic' => 'va'],
                ['word' => 'VE', 'phonetic' => 've'],
                ['word' => 'VI', 'phonetic' => 'vi'],
                ['word' => 'VO', 'phonetic' => 'bo'],
                ['word' => 'VU', 'phonetic' => 'bu'],
            ],
            'W' => [
                ['word' => 'WA', 'phonetic' => 'gua'],
                ['word' => 'WE', 'phonetic' => 'güe'],
                ['word' => 'WI', 'phonetic' => 'güi'],
                ['word' => 'WO', 'phonetic' => 'guo'],
                ['word' => 'WU', 'phonetic' => 'gu'],
            ],
            'X' => [
                ['word' => 'XA', 'phonetic' => 'xa'],
                ['word' => 'XE', 'phonetic' => 'xe'],
                ['word' => 'XI', 'phonetic' => 'xi'],
                ['word' => 'XO', 'phonetic' => 'xo'],
                ['word' => 'XU', 'phonetic' => 'xu'],
            ],
            'Y' => [
                ['word' => 'YA', 'phonetic' => 'ya'],
                ['word' => 'YE', 'phonetic' => 'ye'],
                ['word' => 'YI', 'phonetic' => 'yi'],
                ['word' => 'YO', 'phonetic' => 'yo'],
                ['word' => 'YU', 'phonetic' => 'yu'],
            ],
            'Z' => [
                ['word' => 'ZA', 'phonetic' => 'za'],
                ['word' => 'ZE', 'phonetic' => 'ce'],
                ['word' => 'ZI', 'phonetic' => 'sí'],
                ['word' => 'ZO', 'phonetic' => 'zo'],
                ['word' => 'ZU', 'phonetic' => 'zu'],
            ],
        ];

        foreach ($syllableFamilies as $family => $syllables) {
            foreach ($syllables as $s) {
                Word::updateOrCreate(
                    [
                        'word' => $s['word'],
                        'level' => 1,
                    ],
                    [
                        'emoji' => null,
                        'syllables' => [$s['word']],
                        'phonetic' => $s['phonetic'],
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
