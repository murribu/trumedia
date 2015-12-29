materialAdmin

    .service('playerService', ['$http', function($http){
        this.getPlayers = function() {
            return $http({
                method: 'get',
                url: "/players"
              });
        };
        
        this.getArbitraryPlayers = function(c) {
            return $http({
                method: 'get',
                url: "/players/arbitrary/" + c
            });
        }
        
        this.getTeams = function() {
            return $http({
                method: 'get',
                url: "/teams"
              });
        };
        
        this.getPlayer = function(id) {
            return $http({
                method: 'get',
                url: "/player/" + id
              });
        };
    }])