app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/addcourse.html',
		controller: 'CourseController'
		}
	).when('/addcourse', {
		templateUrl: 'templates/login.html',
		controller: 'CourseController'
		}
	).when('/game', {
		templateUrl: 'templates/game.html',
		controller: 'CourseController'
		}
	).when('/questions', {
		templateUrl: 'templates/questions.html',
		controller: 'CourseController'
		}
	);
}]);
