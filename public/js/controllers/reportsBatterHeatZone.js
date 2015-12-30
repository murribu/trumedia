materialAdmin
    .controller('reportsBatterHeatZoneCtrl', function($scope, $timeout, reportService) {
        $scope.Math = window.Math;
        var self = this;
        self.results = [];
        self.activeTab = 'additional';
        self.basicFilters = {
            'showBalls': true,
            'showStrikes': true,
            'showInPlay': true,
            'selectedSeasons': [2013,2014,2015],
        }
        self.additionalFilters = {
            'selectedPitcher': 0,
            'selectedBatter': 0,
        };
        self.initialAdditionalFilters = jQuery.extend(true, {}, self.additionalFilters);
        self.runningReport = true;
        self.selectedPoitn = [];
        self.dataPoints = [];
        self.zones = {};
        self.displayStat = 'avg';
        self.hotLevels = {
            'avg': .3,
            'obp': .4,
            'slg': .5,
            'ops': .9,
        }
        
        $scope.$watch('rctrl.additionalFilters.selectedBatter', function (newVal, oldVal) {
            if (oldVal == newVal) return;
            self.updateDataPoints();
        }, true);
        
        $scope.$watch('rctrl.additionalFilters.selectedPitcher', function (newVal, oldVal) {
            if (oldVal == newVal) return;
            self.updateDataPoints();
        }, true);

        self.updateDataPoints = function(){
            self.zones = {};
            for(var r = 0; r < 5; r++){
                for(var c = 0; c < 5; c++){
                    self.zones[r + '-' + c] = {
                        'hits': 0,
                        'atbats': 0,
                        'bases' : 0,
                        'onbases' : 0,
                        'plateappearances': 0,
                    }
                }
            }
            
            var filters = {};
            if (self.additionalFilters.selectedPitcher != 0){
                filters.pitcher_id = self.additionalFilters.selectedPitcher;
            }
            if (self.additionalFilters.selectedBatter != 0){
                filters.batter_id = self.additionalFilters.selectedBatter;
            }
            reportService.getPitches(filters).success(function(d){
               self.dataPoints = d.items;
               self.populateZones();
            });
        };
        
        self.populateZones = function(){
            for(p in self.dataPoints){
                for(var r = 0; r < 5; r++){
                    for(var c = 0; c < 5; c++){
                        if (self.filterZone(self.dataPoints[p],r,c)){
                            self.zones[r + '-' + c].hits += self.dataPoints[p].hit;
                            self.zones[r + '-' + c].atbats += self.dataPoints[p].atbat;
                            self.zones[r + '-' + c].bases += self.dataPoints[p].bases;
                            self.zones[r + '-' + c].onbases += self.dataPoints[p].onbase;
                            if (self.dataPoints[p].pa_desc != ""){
                                self.zones[r + '-' + c].plateappearances++;
                            }
                        }
                    }
                }
            }
            return;
        }
        
        self.filterZone = function(point,r,c){
            return (280+(point.x*240*12/17) > ((c+1)*80) 
                    && 280+(point.x*240*12/17) <= ((c+2)*80)
                    && 400-(240*((point.y-point.szb)/(point.szt-point.szb))) > ((r+1)*80)
                    && 400-(240*((point.y-point.szb)/(point.szt-point.szb))) <= ((r+2)*80));
        }
        
        self.filterResults = function(r){
            var d = new Date(parseInt(r.game_date.substring(0,4)), parseInt(r.game_date.substring(5,7)), parseInt(r.game_date.substring(8,10)),0,0,0,0);
            if ($.inArray(d.getFullYear(), self.basicFilters.selectedSeasons) == -1){
                return false;
            }
            if (!self.basicFilters.showBalls && r.ball == 1){
                return false;
            }
            if (!self.basicFilters.showStrikes && r.strike == 1){
                return false;
            }
            if (!self.basicFilters.showInPlay && r.pa_desc != ''){
                return false;
            }
            return true;
        }
        
        self.arraysEqual = function(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length != b.length) return false;

            for (i in a) {
                if ($.isArray(a[i])){
                    if (!self.arraysEqual(a[i], b[i])){
                        return false;
                    }
                }else{
                    if (a[i] !== b[i]) return false;
                }
            }
            return true;
        }
        
        self.range = function(min,max,step){
            step = step || 1;
            var input = [];
            
            for (var i = min; i <= max; i += step){
                input.push(i);
            }
            return input;
        };
        
        
        $("#select-batter").select2({
          ajax: {
            url: "/players/batters",
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                q: params.term
              };
            },
            processResults: function (data, params) {
              // parse the results into the format expected by Select2
              // since we are using custom formatting functions we do not need to
              // alter the remote JSON data, except to indicate that infinite
              // scrolling can be used
              params.page = params.page || 1;
         
              return {
                results: data.items,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          },
          escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
          minimumInputLength: 1,
          templateResult: formatRepo, // omitted for brevity, see the source of this page
          templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });
        
        $("#select-pitcher").select2({
          ajax: {
            url: "/players/pitchers",
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                q: params.term
              };
            },
            processResults: function (data, params) {
              // parse the results into the format expected by Select2
              // since we are using custom formatting functions we do not need to
              // alter the remote JSON data, except to indicate that infinite
              // scrolling can be used
              params.page = params.page || 1;
         
              return {
                results: data.items,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          },
          escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
          minimumInputLength: 1,
          templateResult: formatRepo, // omitted for brevity, see the source of this page
          templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });
    });
    
function formatRepoSelection (repo) {
  return repo.name;
}
function formatRepo (repo) {
  return repo.name;
}