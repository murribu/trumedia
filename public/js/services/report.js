materialAdmin

    .service('reportService', ['$http', function($http){
        this.getCatcherFramingReport = function(filters) {
            var sent = filters;
            
            return $http({
                method: 'post',
                url: "/report/catcherframing",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(sent)
              });
        };
        
        this.getVelocityDiffReport = function(filters) {
            var sent = filters;
            
            return $http({
                method: 'post',
                url: "/report/velocitydiff",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(sent)
            });
        };
        
        this.getPitches = function(filters){
            var sent = filters;
            
            return $http({
                method: 'post',
                url: "/report/pitches",
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(sent)
            });
            
        }
    }])