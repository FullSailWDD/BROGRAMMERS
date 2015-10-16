var proRubApp = angular.module('proRubApp', ['ngRoute'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))'); 
	// $locationProvider.html5Mode(false);
	  $routeProvider.
      when('/', {
        templateUrl: '/views/home.html',
        controller: 'homeCtrl'
      }).
      when('/addDegree', {
        templateUrl: '/views/adddegree.html',
        controller: 'addDegreeCtrl'
      }).
       when('/degree/WDD', {
        templateUrl: '/views/degree.html',
        controller: 'degreeCtrl'
      }).
       when('/degree/WDD/addCourse', {
        templateUrl: '/views/newcourse.html',
        controller: 'newCourseCtrl'
      }).
        when('/addruberic', {
        templateUrl: '/views/addruberic.html',
        controller: 'addrubericCtrl'
      }).
           when('/degree/WDD/WebDeployment/audit', {
        templateUrl: '/views/audit.html',
        controller: 'auditCtrl'
      }).
         when('/degree/WDD/course', {
        templateUrl: '/views/addCourse.html',
        controller: 'addCourseCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);




console.log("main.js is linked properly");


 


proRubApp.controller('homeCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('/views/home.html').success(function(data) {
      // $scope.home = data;
    });
  }]);

proRubApp.controller('addDegreeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/views/adddegree.html').success(function(data) {
      // $scope.course = data;
    });
  }]);
proRubApp.controller('degreeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/views/degree.html').success(function(data) {
      // $scope.course = data;
    });
  }]);

proRubApp.controller('newCourseCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/views/addCourse.html').success(function(data) {
     // $scope.course = data;
    });
  }]);

proRubApp.controller('addCourseCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/views/addcourse.html').success(function(data) {
     // $scope.course = data;
    });
  }]);

proRubApp.controller('auditCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/views/audit.html').success(function(data) {
     // $scope.course = data;
    });
  }]);

console.log("working");