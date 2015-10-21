var proRubApp = angular.module('proRubApp', ['ngRoute'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
  //set interpolateProvider to reset handlebars
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))');

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
       //'enter new course' needs to be dynamic
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

proRubApp.filter('calcGrade', function() {
	return function(rubric) {
		var sectionGrades = [];
		var finalGrade = 0;

		if (rubric) {
			rubric.sections.forEach(function(section, index){
				// Create a variable to hold the sum of the items
				var itemSum = 0;
				section.items.forEach(function(item, index){
					itemSum += item.grade;
				});
				section.grade = itemSum / section.items.length;
				sectionGrades.push(section.grade * section.weight);
				finalGrade += sectionGrades[index];

			});
		}
		return finalGrade.toFixed();
	}
});

proRubApp.controller('homeCtrl', ['$scope', '$http',
  function ($scope, $http,$routeParams,$location) {
	  // Fetches all of the degrees
	  $http.get('/api/fetchDegrees')
	  .success(function(data){
		  // Make the data available to the DOM
		  $scope.data = data;
	  }).error(function(){
		  // TODO: Add error handling
	  });
    // Remove a degree
      $scope.removeDegree = function(){
     //Send a GET Request to the API with the degree abbreviation
     $http.get('/api/deleteDegree/'+ $routeParams.degree)
     // Once we catch a response run this code
     .then(function(result){
     // Forward the user to the home page
     $location.path('/#/');

     }, function(){
      console.log("remove degree request failed");
     // TODO: Add error handling
     });
     }
  }]);

  // reading one degrees from DB
  proRubApp.controller('degreeCtrl', ['$scope', '$http','$routeParams','$location',
	    function ($scope, $http, $routeParams,$location) {
		// Remove a degree
		$scope.removeDegree = function(){
		     //Send a GET Request to the API with the degree abbreviation
		     $http.get('/api/deleteDegree/'+ $routeParams.degree)
		     // Once we catch a response run this code
		     .then(function(result){
		     // Forward the user to the home page
		     $location.path('/#/');

		     }, function(){
				 console.log("remove degree request failed");
		     // TODO: Add error handling
		     });
	     }
		 // Remove a course
		 $scope.removeCourse = function(courseAbbr){
 		     //Send a GET Request to the API with the degree title and degree abbreviation
 		     $http.get('/api/deleteCourse/'+ courseAbbr)
 		     // Once we catch a response run this code
 		     .then(function(result){
 		     // Forward the user to the home page
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

 		     }, function(){
 				 console.log("remove request failed");
 		     // TODO: Add error handling
 		     });
 	     }
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
			  var targRoute = '/#/degree/' + result.data.abbr + "/addCourse";

			  // Forward the user to the new degree they just created
			  window.location.href = targRoute;

		  }, function(){
			  // TODO: Add error handling
		  });
	  }
  }]);

proRubApp.controller('newCourseCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
  	$scope.degreeName = $routeParams.degree;

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


proRubApp.controller('auditCtrl', ['$scope', '$http', '$routeParams', '$filter',
	function ($scope, $http, $routeParams, $filter) {
		// Remove a course
	   $scope.removeRubric = function(rubric){
	   console.log("remove rubric ran");
	   console.log(rubric);
		   //Send a GET Request to the API with the degree title and degree abbreviation
		   $http.get('/api/deleteRubric/'+ rubric._id)
		   // Once we catch a response run this code
		   .then(function(result){
		   console.log("remove request passed");

		   window.location.href = '/#/degree/' + rubric.degreeAbbr;

		   }, function(){
			   console.log("remove request failed");
		   // TODO: Add error handling
		   });
	   }

    $http.get('/api/fetchRubric/' + $routeParams.degree + '/' + $routeParams.course + '/' + $routeParams.rubricTitle)
	.success(function(data){
		console.log(data);
		$scope.rubric = data;

		$scope.$watch(function(){
			$scope.rubric.grade = ~~$filter('calcGrade')($scope.rubric);
		});

		$scope.exportAudit = function() {
			console.log($scope.rubric);

// 			$http.post('/api/newAudit', $scope.rubric)
// 			// Once we catch a response run this code
// 			.then(function(result){

// 			}, function(){
// 			  // TODO: Add error handling
// 			});

		};

	  // creates an array of the rubrics associated with the course
	}).error(function(){
	// TODO: Add error handling
	});
  }]);

proRubApp.controller('editModeCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {

    $http.get('/api/fetchRubric/' + $routeParams.degree + '/' + $routeParams.course + '/' + $routeParams.rubricTitle)
	.success(function(data){
		$scope.rubric = data;
		$scope.updateRubric = function(){
			console.log($scope.rubric);
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
proRubApp.controller('addrubricCtrl', ['$scope', '$http', '$routeParams', '$location',
	function ($scope, $http, $routeParams, $location) {
	$scope.degree = $routeParams.degree;
    $scope.course = $routeParams.course;

    $scope.insertRubric = function() {
	    $scope.rubric.degreeAbbr = $routeParams.degree;
	    $scope.rubric.courseAbbr = $routeParams.course;

		$http.post('/api/newRubric', $scope.rubric)
		// Once we catch a response run this code
		.then(function(result){
			//Create the URL we want to redirect to
			var targRoute = '/degree/' + $scope.rubric.degreeAbbr + '/' + $scope.rubric.courseAbbr + '/' + $scope.rubric.title + '/audit';

			// Forward the user to the degree
			$location.path(targRoute);

	  }, function(){
		  // TODO: Add error handling
	  });
    }
  }]);
