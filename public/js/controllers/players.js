materialAdmin
    .controller('playersCtrl', function($scope, $timeout, playerService) {
        var self = this;
        
        self.players = [];
        self.pageSize = 20;
        self.currentPage = 1;
        self.currentSort = 'name';
        self.filterPosition = '';    
    
        playerService.getPlayers().success(function(data){
            self.players = data;
        });
        
        self.filterPlayers = function(h){
            var pos = "," + h.positions + ",";
            if (self.filterPosition != ''){
                return pos.indexOf("," + self.filterPosition + ",") > -1;
            }else{
                return true;
            }
        };
        
        self.changePage = function(p){
            self.currentPage = p;
        };
        
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
    
        self.changePlayerFilter = function(p){
            switch (p){
                case 'C':
                    $(".btn-filter-players").removeClass('btn-primary').addClass('btn-default');
                    $("#btnShowOnlyCatchers").removeClass('btn-default').addClass('btn-primary');
                    self.currentPage = 1;
                    self.filterPosition = 'C';
                    break;
                case 'P':
                    $(".btn-filter-players").removeClass('btn-primary').addClass('btn-default');
                    $("#btnShowOnlyPitchers").removeClass('btn-default').addClass('btn-primary');
                    self.currentPage = 1;
                    self.filterPosition = 'P';
                    break;
                default:
                    $(".btn-filter-players").removeClass('btn-primary').addClass('btn-default');
                    $("#btnShowAllPlayers").removeClass('btn-default').addClass('btn-primary');
                    self.filterPosition = '';
                    break;
            }
        };
        
    })
