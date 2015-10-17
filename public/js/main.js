var proRubApp = angular.module('proRubApp', ['ngRoute'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
  //set interpolateProvider to reset handlebars
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
       when('/degree/:degree', {
        templateUrl: '/views/degree.html',
        controller: 'degreeCtrl'
      }).
       when('/degree/:degree/addCourse', {
        templateUrl: '/views/newcourse.html',
        controller: 'newCourseCtrl'
      }).
        when('/:degree/:course/addRubric', {
        templateUrl: '/views/addrubric.html',
        controller: 'addrubricCtrl'
      }).
           when('/degree/:degree/:course/:rubricTitle/audit', {
        templateUrl: '/views/audit.html',
        controller: 'auditCtrl'
      }).
          when('/degree/:degree/:course/:rubricTitle/audit/editMode', {
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


console.log("main.js is linked properly");

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

  // reading one degrees from DB
  proRubApp.controller('degreeCtrl', ['$scope', '$http','$routeParams',
    function ($scope, $http, $routeParams) {
		// Fetches all of the degrees
  	  $http.get('/api/fetchDegree/'+ $routeParams.degree)
  	  .success(function(data){
  		  // Make the data available to the DOM
  		  $scope.degreeData = data;
  	  }).error(function(){
  		  // TODO: Add error handling
  	  });

  	  // Grab all of the courses from the database
  	  $http.get('/api/fetchCourses/'+ $routeParams.degree)
  	  .success(function(data){
  		  // Make the data available to the DOM
  		  $scope.coursesData = data;
  		  // For every course, loop through and grab all of the rubrics
  		  $scope.coursesData.forEach(function(course){
		  	  $http.get('/api/fetchRubrics/'+ $routeParams.degree + '/' + course.abbr)
		  	  .success(function(data){
			  	  // creates an array of the rubrics associated with the course
			  	  course.rubrics = data;
		  	  }).error(function(){
		  	  // TODO: Add error handling
		  	  });
  		  });
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

proRubApp.controller('newCourseCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
	// The function to be run when the user presses "Save Course"
    $scope.insertCourse = function(){
	   	  // Grabs the current degree from the URL
	      $scope.course.degreeAbbr = $routeParams.degree;
		  // Send a POST Request to the API with the degree abbreviation, course abbreviation and course title
		  $http.post('/api/newCourse', $scope.course)
		  // Once we catch a response run this code
		  .then(function(result){
			  //Create the URL we want to redirect to
			  var targRoute = '/#/degree/' + result.data.degreeAbbr;

			  // Forward the user to the degree
			  window.location.href = targRoute;

		  }, function(){
			  // TODO: Add error handling
		  });
	  }
  }]);

proRubApp.controller('auditCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
    $http.get('/api/fetchRubric/' + $routeParams.degree + '/' + $routeParams.course + '/' + $routeParams.rubricTitle)
	.success(function(data){
		$scope.rubric = data;
		
		$scope.saveAudit = function() {
			$http.post('/api/newAudit', $scope.rubric)
			// Once we catch a response run this code
			.then(function(result){
			  console.log("Worked");
			
			}, function(){
			  // TODO: Add error handling
			});
		}
	  // creates an array of the rubrics associated with the course
	}).error(function(){
	// TODO: Add error handling
	});
  }]);


console.log("Angular routes and Controllers");

proRubApp.controller('editModeCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
	 
    $http.get('/api/fetchRubric/' + $routeParams.degree + '/' + $routeParams.course + '/' + $routeParams.rubricTitle)
	.success(function(data){
		$scope.rubric = data;
		$scope.updateRubric = function(){			
			$http.put('/api/updateRubric', $scope.rubric)
			.then(function(data){
				var targRoute = '/#/degree/' + $scope.rubric.degreeAbbr + '/' + $scope.rubric.courseAbbr + '/' + $scope.rubric.title + '/audit';

	    		// Forward the user to the degree
			  	window.location.href = targRoute;
			},
			function(err){
				
			});
		}
		
	  // creates an array of the rubrics associated with the course
	}).error(function(){
	// TODO: Add error handling
	});

  }]);

proRubApp.controller('addrubricCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $http, $routeParams) {
    $http.get('/views/addrubric.html').success(function(data) {
     $scope.degree = $routeParams.degree;
     $scope.course= $routeParams.course;
     console.log($scope.course.degreeAbbr);
    });
  }]);
