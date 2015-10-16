var proRubApp = angular.module('proRubApp', ['ngRoute', 'ng-breadcrumbs'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))'); 
	// $locationProvider.html5Mode(true); // eanabling this creates pretty urls

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

// Breadcrumbs must be included with each controller. 
proRubApp.controller('rubricController', function($scope,$routeParams, breadcrumbs){
	// $scope.trail = [$routeParams.degree,$routeParams.course];
	// console.log(breadcrumbs);
	breadcrumbs.options = { 'Degree': $routeParams.degree + ' Details' };
	$scope.breadcrumbs = breadcrumbs;
	$scope.message = 'Look! I am an about page.';
});

// Chapmans way, let's leave this here for reference
// proRubApp.controller('rubricController', function($scope,$routeParams){
// 	$scope.trail = [$routeParams.degree,$routeParams.course];
// 	console.log($scope.trail);
// 	$scope.message = 'Look! I am an about page.';
// });

proRubApp.controller('courseController', function($scope){
	$scope.message = 'Contact us! JK. This is just a demo.';
});


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