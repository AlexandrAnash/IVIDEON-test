var ivideonApp = angular.module('ivideonApp', [
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'videoControllers'
]);

ivideonApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/partials/listVideo.html',
        controller: 'listVideoCtrl'
      }).
      // when('/phones', {
      //   templateUrl: 'partials/phone-detail.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
      otherwise({
        redirectTo: '/'
      });
  }]);