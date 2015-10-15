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
      when('/adddegree', {
        templateUrl: '/views/adddegree.html',
        controller: 'adddegreeCtrl'
      }).
       when('/degree', {
        templateUrl: '/views/degree.html',
        controller: 'degreeCtrl'
      }).
       when('/addcourse', {
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


proRubApp.controller('mainController', function($scope){
	$scope.message = 'Is it working gah yet?';
});

proRubApp.controller('rubricController', function($scope){
	$scope.message = 'Look! I am an about page.';
});

proRubApp.controller('courseController', function($scope){

});

console.log("main.js is linked properly");