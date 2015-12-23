materialAdmin

    .service('playerService', ['$http', function($http){
        this.getPlayers = function() {
            return $http({
                method: 'get',
                url: "/players"
              });
        };
        
        
        this.getTeams = function() {
            return $http({
                method: 'get',
                url: "/teams"
              });
        };
        
        this.getPlayer = function(id) {
            return $http({
                method: 'get',
                url: "/players/" + id
              });
        };
    }])