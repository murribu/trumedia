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

class PitchTypesSeeder extends Seeder{
    public function run(){
        //copied from HackathonProjects.pdf
        $pitch_types = array(
            array(
                'slug' => 'CH',
                'description' => 'Changeup'
            ),
            array(
                'slug' => 'CU',
                'description' => 'Curveball'
            ),
            array(
                'slug' => 'FA',
                'description' => 'Fastball'
            ),
            array(
                'slug' => 'FT',
                'description' => 'Two Seamer'
            ),
            array(
                'slug' => 'FF',
                'description' => 'Four Seamer'
            ),
            array(
                'slug' => 'FC',
                'description' => 'Cutter'
            ),
            array(
                'slug' => 'SL',
                'description' => 'Slider'
            ),
            array(
                'slug' => 'FS',
                'description' => 'Splitter'
            ),
            array(
                'slug' => 'SI',
                'description' => 'Sinker'
            ),
            array(
                'slug' => 'FO',
                'description' => 'Forkball'
            ),
            array(
                'slug' => 'KN',
                'description' => 'Knuckleball'
            ),
            array(
                'slug' => 'KC',
                'description' => 'Knuckle Curve'
            ),
            array(
                'slug' => 'SC',
                'description' => 'Screwball'
            ),
            array(
                'slug' => 'GY',
                'description' => 'Gyroball'
            ),
            array(
                'slug' => 'EP',
                'description' => 'Eephus'
            ),
            array(
                'slug' => 'PO',
                'description' => 'Pitchout'
            ),
            array(
                'slug' => 'IN',
                'description' => 'Intentional Ball'
            ),
            array(
                'slug' => 'AB',
                'description' => 'Automatic Ball'
            ),
            array(
                'slug' => 'AS',
                'description' => 'Automatic Strike'
            ),
            array(
                'slug' => 'UN',
                'description' => 'Unknown'
            ),
        );
        
        foreach($pitch_types as $p){
            $pitch_type = PitchType::where('slug', $p['slug'])->first();
            if (!$pitch_type){
                $pitch_type = new PitchType;
                $pitch_type->slug = $p['slug'];
                $pitch_type->description = $p['description'];
                $pitch_type->timestamp_utc = time();
            }
            $pitch_type->save();
        }
    }
}