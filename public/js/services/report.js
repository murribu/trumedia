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
    }])