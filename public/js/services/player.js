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
        
        this.getPlayerCatcherFraming = function(id) {
            return $http({
                method: 'get',
                url: "/player/" + id + '/catcherframing'
              });
        };
        
        this.getPlayerVelocityDiff = function(id) {
            return $http({
                method: 'get',
                url: "/player/" + id + '/velocitydiff'
              });
        };
        
        this.getPlayerBattedBallDistance = function(id) {
            return $http({
                method: 'get',
                url: "/player/" + id + '/battedballdistance'
              });
        };
        
        this.getBatter = function(q){
            return $http({
                method: 'get',
                url: "/players/batters?q=" + q
            });
        };
        
        this.getPitcher = function(q){
            return $http({
                method: 'get',
                url: "/players/pitchers?q=" + q
            });
        };
    }])