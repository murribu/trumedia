materialAdmin
    .controller('reportsCatcherFramingCtrl', function($scope, $timeout, reportService) {
        var self = this;
        self.results = [];
        self.pageSize = 20;
        self.currentPage = 1;
        self.currentSort = '-score';
        self.minimumPitchCount = 1000;
        self.playerSearch = '';
        self.activeTab = 'additional';
        self.additionalFilters = {
            'inningMin': 1,
            'inningMax': 20,
            'manOnFirst': false,
            'manOnSecond': false,
            'manOnThird': false,
            'outs': [0,1,2],
            'balls': [0,1,2,3],
            'strikes': [0,1,2],
        };
        self.initialAdditionalFilters = jQuery.extend(true, {}, self.additionalFilters);
        self.runningReport = true;
        
        /**/
        reportService.getCatcherFramingReport(self.additionalFilters).success(function(d){
            self.results = d;
            for(r in self.results){
                self.results[r].score = parseFloat(self.results[r].score);
            }
            self.runningReport = false;
        });
        
        self.changeSort = function(s){
            var desc = s.substr(0,1) == '-';
            var column = desc ? s.substr(1,99) : s; 
            if (self.currentSort.substr(0,1) != '-'){
                if (self.currentSort == column){
                    self.currentSort = '-' + self.currentSort;
                }else{
                    self.currentSort = s;
                }
            }else{
                if (self.currentSort.substr(1,99) == column){
                    self.currentSort = column;
                }else{
                    self.currentSort = s;
                }
            }
        };
        
        self.filterResults = function(r){
            return r.pitch_count >= self.minimumPitchCount && (self.playerSearch == '' || r.name.toLowerCase().indexOf(self.playerSearch.toLowerCase()) > -1);
        }
        
        self.changePage = function(p){
            self.currentPage = p;
        };
        
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
        
        self.rerunReport = function(){
            self.results = [];
            self.runningReport = true;
            reportService.getCatcherFramingReport(self.additionalFilters).success(function(d){
                self.results = d;
                for(r in self.results){
                    self.results[r].score = parseFloat(self.results[r].score);
                }
                self.initialAdditionalFilters = jQuery.extend(true, {}, self.additionalFilters);
                self.runningReport = false;
            });
        }
    });