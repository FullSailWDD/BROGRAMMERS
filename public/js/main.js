var proRubApp = angular.module('proRubApp', ['ngRoute', 'ng-breadcrumbs'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))'); 
<<<<<<< HEAD
	// $locationProvider.html5Mode(true); // eanabling this creates pretty urls

	  $routeProvider.
      when('/', {
        templateUrl: '/views/home.html',
        controller: 'homeCtrl'
      }).
      when('/adddegree', {
        templateUrl: '/views/adddegree.html',
        controller: 'adddegreeCtrl'
      }).
       when('/degree/WDD', {
        templateUrl: '/views/degree.html',
        controller: 'degreeCtrl'
      }).
       when('/degree/WDD/addcourse', {
        templateUrl: '/views/addcourse.html',
        controller: 'addcourseCtrl'
      }).
        when('/addruberic', {
        templateUrl: '/views/addruberic.html',
        controller: 'addrubericCtrl'
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