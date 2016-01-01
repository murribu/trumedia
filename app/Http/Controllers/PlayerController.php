<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use Auth;
use DB;
use Response;
use Redirect;
use Session;

use App\Models\Pitch;
use App\Models\Player;

class PlayerController extends Controller {
    
    function getPlayer($id){
        $player = Player::where('players.id', $id)
            ->leftJoin('player_positions', 'players.id', '=', 'player_positions.player_id')
            ->leftJoin('positions', 'positions.id', '=', 'player_positions.position_id')
            ->selectRaw('players.id, players.mlb_id, players.name, players.batter_hand, players.pitcher_hand, group_concat(ifnull(positions.abbr, \'P\') order by positions.id) positions')
            ->groupBy('players.id')
            ->first();
        
        
        return $player;
    }
    
    function getBatters(){
        
        $players = Player::whereRaw('id in (select player_id from player_positions where position_id <> 1)')
                    ->whereRaw('name like ?', array('%'.Input::get('q').'%'))
                    ->limit(50)
                    ->orderBy('name')
                    ->get();
                    
        return array(
            'items' => $players,
            'total_count' => count($players)
        );
    }
    
    function getPitchers(){
        
        $players = Player::where(function($query){
                        $query->whereRaw('id in (select player_id from player_positions where position_id = 1)');
                        $query->orWhereRaw('id not in (select player_id from player_positions)');
                    })
                    ->whereRaw('name like ?', array('%'.Input::get('q').'%'))
                    ->orderBy('name')
                    ->limit(50)
                    ->get();
                    
        return array(
            'items' => $players,
            'total_count' => count($players)
        );
    }
    
    function getPlayerVelocityDifferenceByMonth($id){
        $query = "select year(game_date) y, month(game_date) m
            , sum(case when pitch_type_id in (3,4,5) then release_velocity else 0 end)/sum(case when pitch_type_id in (3,4,5) then 1 else 0 end) fbvelo
            , sum(case when pitch_type_id in (1) then release_velocity else 0 end)/sum(case when pitch_type_id in (1) then 1 else 0 end) cuvelo
            ,sum(case when pitch_type_id in (3,4,5) then release_velocity else 0 end)/sum(case when pitch_type_id in (3,4,5) then 1 else 0 end) - sum(case when pitch_type_id in (1) then release_velocity else 0 end)/sum(case when pitch_type_id in (1) then 1 else 0 end) diff
            from pitches p
            where p.pitcher_id = ".intval($id)."
            and p.pitch_type_id in (1,3,4,5)
            group by year(game_date), month(game_date)";
        $velocitydiffbymonth = DB::select(DB::raw($query));
        
        return $velocitydiffbymonth;
    }
    
    function getPlayerBattedBallDistanceByMonth($id){
        $query = "select avg(nullif(batted_ball_distance,0)) dist, count(id) c, month(game_date) m, year(game_date) y
            from pitches
            where batter_id = ".intval($id)."
            group by year(game_date), month(game_date)";
        $battedballdistancebymonth = DB::select(DB::raw($query));
        
        return $battedballdistancebymonth;
    }
    
    function getPlayerCatcherFramingByMonth($id){
        
        $query = "select p.id, year(game_date) y, month(game_date) m
            , sum(case when abs(p.px) <= 8.5/12 and p.pz <= p.szt and p.pz >= p.szb and pr.id = 7 then -1 
                 when (abs(p.px) > 8.5/12 or p.pz between p.szt and p.szb) and pr.id = 2 then 1
                 else 0 end)*100/count(p.id) score,
            count(p.id) pitch_count
            from pitches p
            left join pitch_results pr on p.pitch_result_id = pr.id
            where 1=1
            and pr.id in (2,7)
            and catcher_id = ".intval($id)."
            group by year(game_date), month(game_date);";
        $catcherframingscorebymonth = DB::select(DB::raw($query));
        
        return $catcherframingscorebymonth;
    }
    
    function getArbitraryPlayers($count){
        $count = intval($count) > 0 ? intval($count) : 10;
        
        $players = Player::leftJoin('player_positions', 'players.id', '=', 'player_positions.player_id')
            ->leftJoin('positions', 'positions.id', '=', 'player_positions.position_id')
            ->selectRaw('players.id, players.mlb_id, players.name, players.batter_hand, players.pitcher_hand, group_concat(ifnull(positions.abbr, \'P\') order by positions.id) positions')
            ->groupBy('players.id')
            ->orderBy(DB::raw('RAND()'))
            ->take($count)
            ->get();
        
        return $players;
    }
    
    function getPlayers(){
        $players = Player::leftJoin('player_positions', 'players.id', '=', 'player_positions.player_id')
            ->leftJoin('positions', 'positions.id', '=', 'player_positions.position_id')
            ->selectRaw('players.id, players.mlb_id, players.name, players.batter_hand, players.pitcher_hand, group_concat(ifnull(positions.abbr, \'P\') order by positions.id) positions')
            ->groupBy('players.id')
            ->get();
        return $players;
    }
    
    function getCatchers(){
        $catchers = Players::whereRaw('mlb_id in (select distinct catcher_id from pitches)')
            ->orderBy('name')
            ->get();
        
        return $catchers;
    }
    
    function getTeams(){
        $teams = Pitch::selectRaw('distinct visitor')->get();
            
        return $teams;
    }
}