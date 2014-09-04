ivideonApp.factory('videoXHRService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    return {
        getData : function(url) {
            return $http.jsonp(url).then(
                function(result) {
                    return result.data;
                }
            );
        }
    }
});