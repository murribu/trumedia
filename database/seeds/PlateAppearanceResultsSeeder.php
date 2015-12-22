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
                'description' => 'Single'
            ),
            array(
                'slug' => 'D',
                'description' => 'Double'
            ),
            array(
                'slug' => 'T',
                'description' => 'Triple'
            ),
            array(
                'slug' => 'HR',
                'description' => 'Homerun'
            ),
            array(
                'slug' => 'BB',
                'description' => 'Walk'
            ),
            array(
                'slug' => 'IBB',
                'description' => 'Intentional Walk'
            ),
            array(
                'slug' => 'HBP',
                'description' => 'Hit by Pitch'
            ),
            array(
                'slug' => 'IP_OUT',
                'description' => 'In Play Out'
            ),
            array(
                'slug' => 'K',
                'description' => 'Strikeout'
            ),
            array(
                'slug' => 'FC',
                'description' => 'Fielder\'s Choice'
            ),
            array(
                'slug' => 'DP',
                'description' => 'Double Play'
            ),
            array(
                'slug' => 'TP',
                'description' => 'Triple Play'
            ),
            array(
                'slug' => 'SH',
                'description' => 'Sacrifice Bunt'
            ),
            array(
                'slug' => 'SF',
                'description' => 'Sacrifice Fly'
            ),
            array(
                'slug' => 'ROE',
                'description' => 'Reached on Error'
            ),
            array(
                'slug' => 'SH_ROE',
                'description' => 'Sacrifice Bunt ROE'
            ),
            array(
                'slug' => 'SF_ROE',
                'description' => 'Sacrifice Fly ROE'
            ),
            array(
                'slug' => 'BI',
                'description' => 'Batter Interference'
            ),
            array(
                'slug' => 'CI',
                'description' => 'Catcher Interference'
            ),
            array(
                'slug' => 'FI',
                'description' => 'Fielder Interference'
            ),
            array(
                'slug' => 'NO_PLAY',
                'description' => 'No Play (ex: Runner Out)'
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
            $result->save();
        }
    }
}
