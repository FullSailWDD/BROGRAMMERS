var prorubApp = angular.module('prorubApp',['ngRoute','prorubControllers']);

prorubApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/index.html',
        controller: 'homeCtrl'
      }).
      when('/adddegree', {
        templateUrl: 'templates/adddegree.html',
        controller: 'adddegreeCtrl'
      }).
       when('/addcourse', {
        templateUrl: 'templates/addcourse.html',
        controller: 'addcourseCtrl'
      }).
        when('/addruberic', {
        templateUrl: 'templates/addruberic.html',
        controller: 'addrubericCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

  }]);