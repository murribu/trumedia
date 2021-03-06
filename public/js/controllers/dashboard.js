materialAdmin
    .controller('dashboardCtrl', function($scope, $timeout, playerService) {
        var self = this;
        self.players = [];
        self.reports = [
        {
            slug: 'catcher-framing',
            name: 'Catcher Framing'
        },
        {
            slug: 'velocity-diff',
            name: 'Pitcher Velocity Difference'
        },
        ];
        
        playerService.getArbitraryPlayers(5).success(function(d){
            self.players = d;
        });
    });