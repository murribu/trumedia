materialAdmin
    .controller('reportsBatterHeatZoneCtrl', function($scope, $timeout, reportService) {
        $scope.Math = window.Math;
        var self = this;
        self.results = [];
        self.activeTab = 'additional';
        self.additionalFilters = {
            'selectedPitcher': 0,
            'selectedBatter': 0,
        };
        self.initialAdditionalFilters = jQuery.extend(true, {}, self.additionalFilters);
        self.runningReport = true;
        self.selectedPoitn = [];
        self.dataPoints = [];
        
        $scope.$watch('rctrl.additionalFilters.selectedBatter', function (newVal, oldVal) {
            if (oldVal == newVal) return;
            self.updateDataPoints();
        }, true);
        
        $scope.$watch('rctrl.additionalFilters.selectedPitcher', function (newVal, oldVal) {
            if (oldVal == newVal) return;
            self.updateDataPoints();
        }, true);

        self.updateDataPoints = function(){
            var filters = {};
            if (self.additionalFilters.selectedPitcher != 0){
                filters.pitcher_id = self.additionalFilters.selectedPitcher;
            }
            if (self.additionalFilters.selectedBatter != 0){
                filters.batter_id = self.additionalFilters.selectedBatter;
            }
            reportService.getPitches(filters).success(function(d){
               self.dataPoints = d.items; 
            });
        };
        
        self.filterResults = function(r){
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