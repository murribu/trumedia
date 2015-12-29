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
        $min_pitch_count = Input::has('min_pitch_count') ? intval(Input::get('min_pitch_count')) : $this->default_min_pitch_count;
        $query = "select pl.name, pl.id,
            sum(case when abs(p.px) <= 8.5/12 and p.pz <= p.szt and p.pz >= p.szb and pr.id = 7 then -1 
                when (abs(p.px) > 8.5/12 or p.pz between p.szt and p.szb) and pr.id = 2 then 1
                else 0 end)*100/count(p.id) score,
            count(p.id) pitch_count
            from pitches p
            left join pitch_results pr on p.pitch_result_id = pr.id
            left join players pl on pl.id = p.catcher_id
            where 1=1
            and pr.id in (2,7)
            group by p.catcher_id
            order by score desc;";
        
        $result = DB::select(DB::raw($query));
        
        return $result;
    }
}