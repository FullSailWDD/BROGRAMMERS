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
        controller: 'addrubricCtrl'
      }).
           when('/degree/WDD/WebDeployment/audit', {
        templateUrl: '/views/audit.html',
        controller: 'auditCtrl'
      }).
          when('/degree/WDD/WebDeployment/audit/editMode', {
        templateUrl: '/views/editMode.html',
        controller: 'editModeCtrl'
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
	  // Fetches all of the degrees
	  $http.get('/api/fetchDegrees')
	  .success(function(data){
		  // Make the data available to the DOM
		  $scope.data = data;
	  }).error(function(){
		  // TODO: Add error handling
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

proRubApp.controller('editModeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/views/editMode.html').success(function(data) {
     // $scope.course = data;
    });
  }]);


// json data testing

proRubApp.controller('DemoCtrl', function ($scope) {

    $scope.chooseCountries=[
        {countryId : 1, name : "France - Mainland", desc: "some description" },
        {countryId : 2, name : "Gibraltar", desc: "some description"},
        {countryId : 3, name : "Malta", desc: "some description"}
    ];

    $scope.selectedCountry = angular.copy($scope.chooseCountries[0]);
});
