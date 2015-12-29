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

class ReportController extends Controller {
    private $default_min_pitch_count = 100;
    
    function postCatcherFramingReport(){
        
        $select = " select pl.name, pl.id,
            sum(case when abs(p.px) <= 8.5/12 and p.pz <= p.szt and p.pz >= p.szb and pr.id = 7 then -1 
                when (abs(p.px) > 8.5/12 or p.pz between p.szt and p.szb) and pr.id = 2 then 1
                else 0 end)*100/count(p.id) score,
            count(p.id) pitch_count ";
        
        $from = " from pitches p
            left join pitch_results pr on p.pitch_result_id = pr.id
            left join players pl on pl.id = p.catcher_id ";
            
        $where = " where 1=1
            and pr.id in (2,7) ";
        
        if (Input::has('inningMax')){
            $where .= "
                and p.inning <= ".intval(Input::get('inningMax'));
        }
        
        if (Input::has('inningMin')){
            $where .= "
                and p.inning >= ".intval(Input::get('inningMin'));
        }
        
        if (Input::has('manOnFirst') && Input::get('manOnFirst') == 'true'){
            $where .= "
                and p.man_on_first = 'true' ";
        }
        
        if (Input::has('manOnSecond') && Input::get('manOnSecond') == 'true'){
            $where .= "
                and p.man_on_second= 'true' ";
        }
        
        if (Input::has('manOnThird') && Input::get('manOnThird') == 'true'){
            $where .= "
                and p.man_on_third= 'true' ";
        }
        
        if (Input::has('outs')){
            $where .= "
                and p.outs in (99,";
            foreach(Input::get('outs') as $out){
                $where .= $out.",";
            }
            $where = substr($where,0,-1);
            $where .= ") ";
        }
        
        if (Input::has('balls')){
            $where .= "
                and p.balls in (99,";
            foreach(Input::get('balls') as $ball){
                $where .= $ball.",";
            }
            $where = substr($where,0,-1);
            $where .= ") ";
        }
        
        if (Input::has('strikes')){
            $where .= "
                and p.strikes in (99,";
            foreach(Input::get('strikes') as $strike){
                $where .= $strike.",";
            }
            $where = substr($where,0,-1);
            $where .= ") ";
        }
            
        $group = "
            group by p.catcher_id ";
        
        $query = $select.$from.$where.$group;
        
        $result = DB::select(DB::raw($query));
        
        return $result;
    }
    
    function postVelocityDiffReport(){
        $select = "select pl.name, pl.id
            ,sum(case when pitch_type_id in (3,4,5) then release_velocity else 0 end)/sum(case when pitch_type_id in (3,4,5) then 1 else 0 end) fbvelo
            , sum(case when pitch_type_id in (1) then release_velocity else 0 end)/sum(case when pitch_type_id in (1) then 1 else 0 end) cuvelo
            ,sum(case when pitch_type_id in (3,4,5) then release_velocity else 0 end)/sum(case when pitch_type_id in (3,4,5) then 1 else 0 end) - sum(case when pitch_type_id in (1) then release_velocity else 0 end)/sum(case when pitch_type_id in (1) then 1 else 0 end) diff
            , count(p.id) pitch_count";
        $from = "
            from pitches p 
            left join players pl on pl.id = p.pitcher_id ";
        $where = "
            where p.pitch_type_id in (1,3,4,5) ";
        $group = "
            group by p.pitcher_id";
            
        if (Input::has('inningMax')){
            $where .= "
                and p.inning <= ".intval(Input::get('inningMax'));
        }
        
        if (Input::has('inningMin')){
            $where .= "
                and p.inning >= ".intval(Input::get('inningMin'));
        }
        
        if (Input::has('manOnFirst') && Input::get('manOnFirst') == 'true'){
            $where .= "
                and p.man_on_first = 'true' ";
        }
        
        if (Input::has('manOnSecond') && Input::get('manOnSecond') == 'true'){
            $where .= "
                and p.man_on_second= 'true' ";
        }
        
        if (Input::has('manOnThird') && Input::get('manOnThird') == 'true'){
            $where .= "
                and p.man_on_third= 'true' ";
        }
        
        if (Input::has('outs')){
            $where .= "
                and p.outs in (99,";
            foreach(Input::get('outs') as $out){
                $where .= $out.",";
            }
            $where = substr($where,0,-1);
            $where .= ") ";
        }
        
        if (Input::has('balls')){
            $where .= "
                and p.balls in (99,";
            foreach(Input::get('balls') as $ball){
                $where .= $ball.",";
            }
            $where = substr($where,0,-1);
            $where .= ") ";
        }
        
        if (Input::has('strikes')){
            $where .= "
                and p.strikes in (99,";
            foreach(Input::get('strikes') as $strike){
                $where .= $strike.",";
            }
            $where = substr($where,0,-1);
            $where .= ") ";
        }
        $query = $select.$from.$where.$group;
        
        $result = DB::select(DB::raw($query));
        
        return $result;
    }
}