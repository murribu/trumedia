materialAdmin
    .controller('reportsCatcherFramingCtrl', function($scope, $timeout, reportService) {
        var self = this;
        self.results = [];
        self.pageSize = 20;
        self.currentPage = 1;
        self.currentSort = '-score';
        self.minimumPitchCount = 1000;
        self.playerSearch = '';
        
        reportService.getCatcherFramingReport('temp').success(function(d){
            self.results = d;
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
            return r.pitch_count >= self.minimumPitchCount && (self.playerSearch == '' || r.name.indexOf(self.playerSearch) > -1);
        }
        
        self.changePage = function(p){
            self.currentPage = p;
        };
    });