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
        when('/addrubric', {
        templateUrl: '/views/addrubric.html',
        controller: 'addrubericCtrl'
      }).
           when('/degree/WDD/WebDeployment/audit', {
        templateUrl: '/views/audit.html',
        controller: 'auditCtrl'
      }).
         when('/degree/WDD/course', {
        templateUrl: '/views/addcourse.html',
        controller: 'addCourseCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

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
    $http.get('/views/addcourse.html').success(function(data) {
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

console.log("Angular routes and Controllers");
