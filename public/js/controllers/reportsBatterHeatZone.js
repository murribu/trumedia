materialAdmin
    .controller('reportsBatterHeatZoneCtrl', function($location, $scope, $timeout, playerService, reportService, growlService) {
        $scope.Math = window.Math;
        var self = this;
        self.filters = {
            'selectedPitcher': null,
            'selectedBatter': null,
            'showBalls': true,
            'showStrikes': true,
            'showInPlay': true,
            'selectedSeasons': [2013,2014,2015],
            'selectedPlateAppearanceResults': [],
            'selectedPitchTypes': [],
            'selectedPitchResults': [],
        };
        self.runningReport = true;
        self.selectedPoint = [];
        self.dataPoints = [];
        self.zones = {};
        self.statsHotLevels = [
            {
                slug: 'avg',
                hot: .3,
                label: 'Batting Average',
            },
            {
                slug: 'obp',
                hot: .4,
                label: 'On Base %',
            },
            {
                slug: 'slg',
                hot: .5,
                label: 'Slugging %',
            },
            {
                slug: 'ops',
                hot: .9,
                label: 'On Base Plus Slugging %',
            },
        ]
        self.displayStat = self.statsHotLevels[0];
        self.showReport = false;
        self.pitchTypes = [];
        self.pitchResults = [];
        self.plateAppearanceResults = [];
        self.view = 'default'; //as opposed to viewing an AtBat
        self.batters = [];
        self.pitchers = [];
    
        reportService.getPlateAppearanceResults().success(function(d){
            self.plateAppearanceResults = d;
            self.filters.selectedPlateAppearanceResults = d;
        });
    
        reportService.getPitchTypes().success(function(d){
            self.pitchTypes = d;
            self.filters.selectedPitchTypes = d;
        });
    
        reportService.getPitchResults().success(function(d){
            self.pitchResults = d;
            self.filters.selectedPitchResults = d;
        });
        
        if ($location.path().substr(11,999) != ''){
            playerService.getPlayer($location.path().substr(11,999)).success(function(d){
                if (("," + d.positions + ",").indexOf(",P,") > -1){
                    self.filters.selectedPitcher = d;
                }else{
                    self.filters.selectedBatter = d;
                }
            });
        }
        
        $scope.$watch('rctrl.filters.selectedPlateAppearanceResults', function (newVal, oldVal) {
            if (self.filters.selectedPlateAppearanceResults.length != self.plateAppearanceResults.length){
                self.filters.showBalls = false;
                self.filters.showStrikes = false;
            }
        }, true);
        
        $scope.$watch('rctrl.filters.showBalls', function (newVal, oldVal) {
            if (self.filters.selectedPlateAppearanceResults.length != self.plateAppearanceResults.length && self.filters.showBalls){
                growlService.growl('You must select all PA Results in order to select \'Show Balls\'', 'inverse');
                self.filters.showBalls = false;
            }
        }, true);
        
        $scope.$watch('rctrl.filters.showStrikes', function (newVal, oldVal) {
            if (self.filters.selectedPlateAppearanceResults.length != self.plateAppearanceResults.length && self.filters.showStrikes){
                growlService.growl('You must select all PA Results in order to select \'Show Balls\'', 'inverse');
                self.filters.showStrikes = false;
            }
        }, true);
    
        self.resetPitcher = function(){
            self.filters.selectedPitcher = null;
        }
        
        self.resetBatter = function(){
            self.filters.selectedBatter = null;
        }
        
        self.resetParameters = function(){
            self.resetPitcher();
            self.resetBatter();
            self.dataPoints = [];
            self.showReport = false;
            self.filters.selectedPitchTypes = self.pitchTypes;
            self.filters.selectedPitchResults = self.pitchResults;
            self.filters.selectedPlateAppearanceResults = self.plateAppearanceResults;
            self.filters.showBalls = true;
            self.filters.showStrikes = true;
            self.filters.showInPlay = true;
            self.filters.selectedSeasons = [2013,2014,2015];
        };

        self.runReport = function(){
            self.selectedPitch = false;
            self.runningReport = true;
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
            if (self.filters.selectedPitcher){
                filters.pitcher_id = self.filters.selectedPitcher.id;
            }
            if (self.filters.selectedBatter){
                filters.batter_id = self.filters.selectedBatter.id;
            }
            if (self.filters.showBalls == 0){
                filters.showBalls = 0;
            }
            if (self.filters.showStrikes == 0){
                filters.showStrikes = 0;
            }
            if (self.filters.showInPlay == 0){
                filters.showInPlay = 0;
            }
            if ($.inArray(2013, self.filters.selectedSeasons) > -1){
                filters.show2013 = 1;
            }
            if ($.inArray(2014, self.filters.selectedSeasons) > -1){
                filters.show2014 = 1;
            }
            if ($.inArray(2015, self.filters.selectedSeasons) > -1){
                filters.show2015 = 1;
            }
            filters.pitch_types = self.filters.selectedPitchTypes;
            filters.pitch_results = self.filters.selectedPitchResults;
            filters.plate_appearance_results = self.filters.selectedPlateAppearanceResults;
            reportService.getPitches(filters).success(function(d){
                if (d.error_code == '406'){
                    growlService.growl(d.message, 'danger');
                }else{
                    self.view = 'default';
                    self.dataPoints = d.items;
                    self.populateZones();
                    self.showReport = true;
                }
                self.runningReport = false;
            })
            .error(function(d){
                growlService.growl('There was an error', 'danger');
                self.runningReport = false;
            });
        };
    
        self.viewAB = function(slug){
            self.runningReport = true;
            self.dataPoints = [];
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
            filters.slug = slug;
            reportService.getPitches(filters).success(function(d){
                if (d.error_code == '406'){
                    growlService.growl(d.message, 'danger');
                }else{
                    self.view = 'ab';
                    self.dataPoints = d.items;
                    self.populateZones();
                    self.showReport = true;
                    self.runningReport = false;
                }
            })
            .error(function(d){
                growlService.growl('There was an error', 'danger');
                self.runningReport = false;
            });
        }
    
        self.selectPitch = function(p){
            self.selectedPitch = p;
            var myCanvas = document.getElementById("diamond");
            var ctx = myCanvas.getContext("2d");
            myCanvas.style.width='100px';
            myCanvas.style.height='100px';

            //Begin our drawing
            ctx.beginPath();
            ctx.moveTo(150,9);
            ctx.lineTo(282,75);
            ctx.lineTo(150,141);
            ctx.lineTo(18,75);

            //Define the style of the shape
            ctx.lineWidth = 3;
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.strokeStyle = "rgb(0, 0, 0)";

            //Close the path
            ctx.closePath();

            //Fill the path with ourline and color
            ctx.fill();
            ctx.stroke();

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
    
        self.refreshBatters = function(search){
            playerService.getBatter(search).then(function(d){
                self.batters = d.data.items;
            });
        };
    
        self.refreshPitchers = function(search){
            playerService.getPitcher(search).then(function(d){
                self.pitchers = d.data.items;
            });
        };
        
    });
    
function formatRepoSelection (repo) {
  return repo.name;
}
function formatRepo (repo) {
  return repo.name;
}