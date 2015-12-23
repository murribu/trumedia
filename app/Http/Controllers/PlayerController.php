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
        $player = Player::find($id);
        
        return $player;
    }
    
    function getPlayers(){
        DB::enableQueryLog();
        $players = Player::leftJoin('pitches', 'players.name', 'players.id', '=', 'catcher_id')
            ->selectRaw('players.id, players.mlb_id, players.batter_hand, players.pitcher_hand, case when pitches.catcher_id is null then 0 else 1 end is_catcher')
            ->groupBy('players.id')
            ->get();
        dd(DB::getQueryLog());
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