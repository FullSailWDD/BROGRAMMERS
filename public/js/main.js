var proRubApp = angular.module('proRubApp', ['ngRoute', 'ng-breadcrumbs'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))'); 
	// $locationProvider.html5Mode(true); // eanabling this creates pretty urls

	$routeProvider 
		// basic route for the home page
		.when('/', {
			templateUrl : '/views/home.html',
			controller  : 'mainController'
		})

		// basic route for the rubric page
		.when('/rubric', {
			templateUrl : '/views/rubric.html',
			controller  : 'rubricController'
		})

		// basic route for the course page
		.when('/course', {
			templateUrl : '/views/course.html',
			controller  : 'courseController'
		})

		// breadcrumbs require this route configure to work. 
		.when('/degree/:degree/course/:course', {
          templateUrl: '/views/rubric.html',
          controller: 'rubricController',
          label: '  Degree > Add rubric'
          //label: $routeParams.degree + '  Add rubric'
          // label : $scope.breadcrumbs = [$routeParams.degree,$routeParams.course]
        })

		.otherwise({
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