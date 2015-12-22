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

class PitchResultsSeeder extends Seeder{
    public function run(){
        //copied from HackathonProjects.pdf
        $pitch_results = array(
            array(
                'slug' => 'SS',
                'description' => 'Swinging Strike'
            ),
            array(
                'slug' => 'SL',
                'description' => 'Strike Looking'
            ),
            array(
                'slug' => 'F',
                'description' => 'Foul'
            ),
            array(
                'slug' => 'FT',
                'description' => 'Foul Tip'
            ),
            array(
                'slug' => 'FB',
                'description' => 'Foul Bunt'
            ),
            array(
                'slug' => 'MB',
                'description' => 'Missed Bunt'
            ),
            array(
                'slug' => 'B',
                'description' => 'Ball'
            ),
            array(
                'slug' => 'BID',
                'description' => 'Ball in Dirt'
            ),
            array(
                'slug' => 'HBP',
                'description' => 'Hit By Pitch'
            ),
            array(
                'slug' => 'IB',
                'description' => 'Interntional Ball'
            ),
            array(
                'slug' => 'PO',
                'description' => 'Pitch Out'
            ),
            array(
                'slug' => 'IP',
                'description' => 'Ball in Play'
            ),
            array(
                'slug' => 'AS',
                'description' => 'Automatic Strike'
            ),
            array(
                'slug' => 'AB',
                'description' => 'Automatic Ball'
            ),
            array(
                'slug' => 'CI',
                'description' => 'Catcher Interference'
            ),
            array(
                'slug' => 'UK',
                'description' => 'Unknown'
            ),
        );
        
        foreach($pitch_results as $p){
            $pitch_result = PitchResult::where('slug', $p['slug'])->first();
            if (!$pitch_result){
                $pitch_result = new PitchResult;
                $pitch_result->slug = $p['slug'];
                $pitch_result->description = $p['description'];
                $pitch_result->timestamp_utc = time();
            }
            $pitch_result->save();
        }
    }
}