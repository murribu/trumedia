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
                'description' => 'Swinging Strike',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'SL',
                'description' => 'Strike Looking',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'F',
                'description' => 'Foul',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'FT',
                'description' => 'Foul Tip',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'FB',
                'description' => 'Foul Bunt',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'MB',
                'description' => 'Missed Bunt',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'B',
                'description' => 'Ball',
                'strike' => 0,
                'ball' => 1,
            ),
            array(
                'slug' => 'BID',
                'description' => 'Ball in Dirt',
                'strike' => 0,
                'ball' => 1,
            ),
            array(
                'slug' => 'HBP',
                'description' => 'Hit By Pitch',
                'strike' => 0,
                'ball' => 1,
            ),
            array(
                'slug' => 'IB',
                'description' => 'Interntional Ball',
                'strike' => 0,
                'ball' => 1,
            ),
            array(
                'slug' => 'PO',
                'description' => 'Pitch Out',
                'strike' => 0,
                'ball' => 1,
            ),
            array(
                'slug' => 'IP',
                'description' => 'Ball in Play',
                'strike' => 0,
                'ball' => 0,
            ),
            array(
                'slug' => 'AS',
                'description' => 'Automatic Strike',
                'strike' => 1,
                'ball' => 0,
            ),
            array(
                'slug' => 'AB',
                'description' => 'Automatic Ball',
                'strike' => 0,
                'ball' => 1,
            ),
            array(
                'slug' => 'CI',
                'description' => 'Catcher Interference',
                'strike' => 0,
                'ball' => 0,
            ),
            array(
                'slug' => 'UK',
                'description' => 'Unknown',
                'strike' => 0,
                'ball' => 0,
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
            $pitch_result->ball = $p['ball'];
            $pitch_result->strike = $p['strike'];
            $pitch_result->save();
        }
    }
}