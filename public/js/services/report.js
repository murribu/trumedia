materialAdmin

    .service('reportService', ['$http', function($http){
        this.getCatcherFramingReport = function(slug) {
            var sent = {
                slug: slug
            };
            
            return $http({
                method: 'post',
                url: "/report/catcherframing",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(sent)
              });
        };
    }])