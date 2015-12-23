materialAdmin
    .controller('playerCtrl', function($scope, $timeout, $location, playerService) {
        var self = this;
        self.player = [];
        self.activeTab = 'stats';
        self.currentCareerSort = 'season';
        
        playerService.getPlayer($location.path().substr(9,999)).success(function(data){
            self.player = data;        
        });
        
        self.changeCareerSort = function(c){
            self.currentCareerSort = c;
        }
    });