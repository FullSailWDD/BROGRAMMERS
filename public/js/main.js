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


 


// Grab all of the degrees to populate on the home page
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

// Insert a new degree
proRubApp.controller('addDegreeCtrl', ['$scope', '$http',
  function ($scope, $http) {
	  // The function to be run when the user presses "Save Degree Program"
	  $scope.insertDegree = function(){
		  // Send a POST Request to the API with the degree title and degree abbreviation
		  $http.post('/api/newDegree', $scope.degree)
		  // Once we catch a response run this code
		  .then(function(result){
			  // Create the URL we want to redirect to
			  var targRoute = '/#/degree/' + result.data.abbr;
			  
			  // Forward the user to the new degree they just created
			  window.location.href = targRoute;
			  
		  }, function(){
			  // TODO: Add error handling
		  });
	  }
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