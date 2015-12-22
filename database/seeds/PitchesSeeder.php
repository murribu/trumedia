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

class PitchesSeeder extends Seeder{
    public function run(){
        $raw_data = RawDatum::chunk(200, function($raw_data){
            $raw_data->each(function($raw_datum){
                $batter = Player::where('mlb_id', $raw_datum->batter_id)->first();
                if (!$batter){
                    $batter = new Player;
                    $batter->mlb_id = $raw_datum->batter_id;
                    $batter->name = $raw_datum->batter;
                }
                $batter->batter_hand = $raw_datum->batter_hand;
                $batter->timestamp_utc = time();
                $batter->save();
                $pitcher = Player::where('mlb_id', $raw_datum->pitcher_id)->first();
                if (!$pitcher){
                    $pitcher = new Player;
                    $pitcher->mlb_id = $raw_datum->pitcher_id;
                    $pitcher->name = $raw_datum->pitcher;
                }
                $pitcher->pitcher_hand = $raw_datum->pitcher_hand;
                $pitcher->timestamp_utc = time();
                $pitcher->save();
                $catcher = Player::where('mlb_id', $raw_datum->catcher_id)->first();
                if (!$catcher){
                    $catcher = new Player;
                    $catcher->mlb_id = $raw_datum->catcher_id;
                    $catcher->name = $raw_datum->catcher;
                }
                $catcher->timestamp_utc = time();
                $catcher->save();
                $pitch_result = PitchResult::where('slug', $raw_datum->pitch_result)->first();
                if (!$pitch_result){
                    $pitch_result = new PitchResult;
                    $pitch_result->slug = $raw_datum->pitch_result;
                    $pitch_result->timestamp_utc = time();
                    $pitch_result->save();
                }
                $pitch_type = PitchType::where('slug', $raw_datum->pitch_type)->first();
                if (!$pitch_type){
                    $pitch_type = new PitchType;
                    $pitch_type->slug = $raw_datum->pitch_type;
                    $pitch_type->timestamp_utc = time();
                    $pitch_type->save();
                }
                $plate_appearance_result = PlateAppearanceResult::where('slug', $raw_datum->pa_result)->first();
                if (!$plate_appearance_result){
                    $plate_appearance_result = new PlateAppearanceResult;
                    $plate_appearance_result->slug = $raw_datum->pa_result;
                    $plate_appearance_result->timestamp_utc = time();
                    $plate_appearance_result->save();
                }
                $batted_ball_type = BattedBallType::where('slug', $raw_datum->batted_ball_type)->first();
                if (!$batted_ball_type){
                    $batted_ball_type = new BattedBallType;
                    $batted_ball_type->slug = $raw_datum->batted_ball_type;
                    $batted_ball_type->timestamp_utc = time();
                    $batted_ball_type->save();
                }
                $pitch = Pitch::where('raw_data_id', $raw_datum->id)->first();
                if (!$pitch){
                    $pitch = new Pitch;
                    $pitch->raw_data_id = $raw_datum->id;
                }
                $pitch->season_year = $raw_datum->season_year;
                $pitch->game_string = $raw_datum->game_string;
                $pitch->game_date = $raw_datum->game_date;
                $pitch->game_type = $raw_datum->game_type;
                $pitch->visitor = $raw_datum->visitor;
                $pitch->home = $raw_datum->home;
                $pitch->visiting_team_final_runs = $raw_datum->visiting_team_final_runs;
                $pitch->home_team_final_runs = $raw_datum->home_team_final_runs;
                $pitch->inning = $raw_datum->inning;
                $pitch->side = $raw_datum->side;
                if ($batter->id == 0 || $pitcher->id == 0){
                    dd(array('raw_data' => $raw_datum,
                             'batter' => $batter,
                             'pitcher' => $pitcher));
                }
                $pitch->batter_id = $batter->id;
                $pitch->pitcher_id = $pitcher->id;
                $pitch->inning = $raw_datum->inning;
                $pitch->catcher_id = $catcher->id;
                $pitch->times_faced = $raw_datum->times_faced;
                $pitch->batter_pos = $raw_datum->batter_pos;
                $pitch->balls = $raw_datum->balls;
                $pitch->strikes = $raw_datum->strikes;
                $pitch->outs = $raw_datum->outs;
                $pitch->man_on_first = $raw_datum->man_on_first == "TRUE";
                $pitch->man_on_second = $raw_datum->man_on_second == "TRUE";
                $pitch->man_on_third = $raw_datum->man_on_third == "TRUE";
                $pitch->end_man_on_first = $raw_datum->end_man_on_first == "TRUE";
                $pitch->end_man_on_second = $raw_datum->end_man_on_second == "TRUE";
                $pitch->end_man_on_third = $raw_datum->end_man_on_third == "TRUE";
                $pitch->visiting_team_current_runs = $raw_datum->visiting_team_current_runs;
                $pitch->home_team_current_runs = $raw_datum->home_team_current_runs;
                $pitch->pitch_result_id = $pitch_result->id;
                $pitch->pitch_type_id = $pitch_type->id;
                $pitch->release_velocity = $raw_datum->release_velocity;
                $pitch->spin_rate = $raw_datum->spin_rate;
                $pitch->spin_direction = $raw_datum->spin_direction;
                $pitch->px = $raw_datum->px;
                $pitch->pz = $raw_datum->pz;
                $pitch->szt = $raw_datum->szt;
                $pitch->szb = $raw_datum->szb;
                $pitch->x0 = $raw_datum->x0;
                $pitch->y0 = $raw_datum->y0;
                $pitch->z0 = $raw_datum->z0;
                $pitch->vx0 = $raw_datum->vx0;
                $pitch->vy0 = $raw_datum->vy0;
                $pitch->vz0 = $raw_datum->vz0;
                $pitch->ax = $raw_datum->ax;
                $pitch->ay = $raw_datum->ay;
                $pitch->az = $raw_datum->az;
                $pitch->pa_result_id = $plate_appearance_result->id;
                $pitch->runs_home = $raw_datum->runsHome;
                $pitch->batted_ball_type_id = $batted_ball_type->id;
                $pitch->batted_ball_angle = $raw_datum->batted_ball_angle;
                $pitch->batted_ball_distance = $raw_datum->batted_ball_distance;
                $pitch->atbat_desc = $raw_datum->atbat_desc;
                $pitch->timestamp_utc = time();
                if(!$pitch->save()){
                    dd($raw_datum);
                }
            });
        });
    }
}