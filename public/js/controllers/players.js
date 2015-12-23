materialAdmin
    .controller('playersCtrl', function($scope, $timeout, playerService) {
        var self = this;
        
        self.players = [];
        self.pageSize = 20;
        self.currentPage = 1;
        self.currentSort = 'name';
        
        playerService.getPlayers().success(function(data){
            self.players = data;
        });
        
        self.filterPlayers = function(h){
            return true;
        }
        
        self.changePage = function(p){
            self.currentPage = p;
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
        }
    })
