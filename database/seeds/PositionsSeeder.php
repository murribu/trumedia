<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\BattedBallType;
use App\Models\PitchResult;
use App\Models\PitchType;
use App\Models\Pitch;
use App\Models\PlateAppearanceResult;
use App\Models\Player;
use App\Models\PlayerPosition;
use App\Models\Position;
use App\Models\RawDatum;

class PositionsSeeder extends Seeder{
    public function run(){
        //copied from HackathonProjects.pdf
        $positions = array(
            array(
                'abbr' => 'P',
            ),
            array(
                'abbr' => 'C',
            ),
            array(
                'abbr' => '1B',
            ),
            array(
                'abbr' => '2B',
            ),
            array(
                'abbr' => '3B',
            ),
            array(
                'abbr' => 'SS',
            ),
            array(
                'abbr' => 'LF',
            ),
            array(
                'abbr' => 'CF',
            ),
            array(
                'abbr' => 'RF',
            ),
            array(
                'abbr' => 'DH',
            ),
            array(
                'abbr' => 'PH',
            ),
        );
        
        foreach($positions as $p){
            $position = Position::where('abbr', $p['abbr'])->first();
            if (!$position){
                $position = new Position;
                $position->abbr = $p['abbr'];
            }
            $position->save();
        }
    }
}