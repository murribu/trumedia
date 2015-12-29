materialAdmin
    .controller('reportsVelocityDiffCtrl', function($scope, $timeout, reportService) {
        var self = this;
        self.results = [];
        self.pageSize = 20;
        self.currentPage = 1;
        self.currentSort = '-diff';
        self.minimumPitchCount = 1000;
        self.playerSearch = '';
        self.activeTab = 'basic';
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
        reportService.getVelocityDiffReport(self.additionalFilters).success(function(d){
            self.results = d;
            
            for(r in self.results){
                self.results[r].cuvelo = parseFloat(self.results[r].cuvelo) || 0;
                self.results[r].fbvelo = parseFloat(self.results[r].fbvelo) || 0;
                self.results[r].diff = parseFloat(self.results[r].diff) || 0;
            }
            self.runningReport = false;
        });
        
        self.rerunReport = function(){
            self.results = [];
            self.runningReport = true;
            reportService.getVelocityDiffReport(self.additionalFilters).success(function(d){
                self.results = d;
                for(r in self.results){
                    self.results[r].cuvelo = parseFloat(self.results[r].cuvelo) || 0;
                    self.results[r].fbvelo = parseFloat(self.results[r].fbvelo) || 0;
                    self.results[r].diff = parseFloat(self.results[r].diff) || 0;
                }
                self.initialAdditionalFilters = jQuery.extend(true, {}, self.additionalFilters);
                self.runningReport = false;
            });
        }
        
        
        
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
    });