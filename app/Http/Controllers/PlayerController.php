<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use DB;
use Input;
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
        
        $query = "select p.id, year(game_date) y, month(game_date) m
            , sum(case when abs(p.px) <= 8.5/12 and p.pz <= p.szt and p.pz >= p.szb and pr.id = 7 then -1 
                 when (abs(p.px) > 8.5/12 or p.pz between p.szt and p.szb) and pr.id = 2 then 1
                 else 0 end)*100/count(p.id) score,
            count(p.id) pitch_count
            from pitches p
            left join pitch_results pr on p.pitch_result_id = pr.id
            where 1=1
            and p.pitch_result_id in (2,7)
            and catcher_id = ".$player->id."
            group by year(game_date), month(game_date);";
        $player->catcherframingscorebymonth = DB::select(DB::raw($query));
        
        return $player;
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