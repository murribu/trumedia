<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\BattedBallType;
use App\Models\PitchResult;
use App\Models\PitchType;
use App\Models\Pitch;
use App\Models\PlateAppearanceResult;
use App\Models\Player;
use App\Models\RawDatum;

class PlateAppearanceResultsSeeder extends Seeder{
    public function run(){
        //copied from HackathonProjects.pdf
        $results = array(
            array(
                'slug' => 'S',
                'description' => 'Single',
                'atbat' => 1,
                'hit' => 1,
                'onbase' => 1,
                'bases' => 1,
            ),
            array(
                'slug' => 'D',
                'description' => 'Double',
                'atbat' => 1,
                'hit' => 1,
                'onbase' => 1,
                'bases' => 2,
            ),
            array(
                'slug' => 'T',
                'description' => 'Triple',
                'atbat' => 1,
                'hit' => 1,
                'onbase' => 1,
                'bases' => 3,
            ),
            array(
                'slug' => 'HR',
                'description' => 'Homerun',
                'atbat' => 1,
                'hit' => 1,
                'onbase' => 1,
                'bases' => 4,
            ),
            array(
                'slug' => 'BB',
                'description' => 'Walk',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'IBB',
                'description' => 'Intentional Walk',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'HBP',
                'description' => 'Hit by Pitch',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'IP_OUT',
                'description' => 'In Play Out',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'K',
                'description' => 'Strikeout',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'FC',
                'description' => 'Fielder\'s Choice',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'DP',
                'description' => 'Double Play',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'TP',
                'description' => 'Triple Play',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'SH',
                'description' => 'Sacrifice Bunt',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'SF',
                'description' => 'Sacrifice Fly',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'ROE',
                'description' => 'Reached on Error',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'SH_ROE',
                'description' => 'Sacrifice Bunt ROE',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'SF_ROE',
                'description' => 'Sacrifice Fly ROE',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 1,
                'bases' => 0,
            ),
            array(
                'slug' => 'BI',
                'description' => 'Batter Interference',
                'atbat' => 1,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'CI',
                'description' => 'Catcher Interference',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'FI',
                'description' => 'Fielder Interference',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
            array(
                'slug' => 'NO_PLAY',
                'description' => 'No Play (ex: Runner Out)',
                'atbat' => 0,
                'hit' => 0,
                'onbase' => 0,
                'bases' => 0,
            ),
        );
        
        foreach($results as $r){
            $result = PlateAppearanceResult::where('slug', $r['slug'])->first();
            if (!$result){
                $result = new PlateAppearanceResult;
                $result->slug = $r['slug'];
                $result->description = $r['description'];
                $result->timestamp_utc = time();
            }
            $result->atbat = $r['atbat'];
            $result->hit = $r['hit'];
            $result->onbase = $r['onbase'];
            $result->bases = $r['bases'];
            $result->save();
        }
    }
}
