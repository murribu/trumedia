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

class BattedBallTypesSeeder extends Seeder{
    public function run(){
        //copied from HackathonProjects.pdf
        $types = array(
            array(
                'slug' => 'PU',
                'description' => 'Pop Up'
            ),
            array(
                'slug' => 'FB',
                'description' => 'Fly Ball'
            ),
            array(
                'slug' => 'GB',
                'description' => 'Ground Ball'
            ),
            array(
                'slug' => 'LD',
                'description' => 'Line Drive'
            ),
            array(
                'slug' => 'BPU',
                'description' => 'Bunt Pop Up'
            ),
            array(
                'slug' => 'BGB',
                'description' => 'Bunt Ground Ball'
            ),
            array(
                'slug' => 'UK',
                'description' => 'Unknown'
            ),
        );
        
        foreach($types as $t){
            $type = BattedBallType::where('slug', $t['slug'])->first();
            if (!$type){
                $type = new BattedBallType;
                $type->slug = $t['slug'];
                $type->description = $t['description'];
                $type->timestamp_utc = time();
            }
            $type->save();
        }
    }
}
