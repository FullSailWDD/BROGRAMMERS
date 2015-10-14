
var proRubApp = angular.module('proRubApp', ['ngRoute'])
.config(['$interpolateProvider', '$routeProvider', '$locationProvider', function($interpolateProvider, $routeProvider, $locationProvider){
	$interpolateProvider.startSymbol('((');
	$interpolateProvider.endSymbol('))'); 
	$locationProvider.html5Mode(true);

	$routeProvider 
		//route for the home page
		.when('/', {
			templateUrl : '/views/home.html',
			controller  : 'mainController'
		})

		//route for the about page
		.when('/about', {
			templateUrl : '/views/about.html',
			controller  : 'aboutController'
		})

		//route for the contact page
		.when('/contact', {
			templateUrl : '/views/contact.html',
			controller  : 'contactController'
		})

		.otherwise({
			redirectTo: '/'
		});
}])


// var proRubApp = angular.module('proRubApp',['ngRoute']);

// //This allows angular binding inside a handlebars template
// function handlebarsBinding($interpolateProvider) {
//     $interpolateProvider.startSymbol('((').endSymbol('))');
// }

// function locationing($locationProvider){
// 	// use the HTML5 History API
// 	$locationProvider.html5Mode(true).hashPrefix('!');
// }

// function routering($routeProvider) {

//     $routeProvider 
// 		//route for the home page
// 		.when('/', {
// 			templateUrl : 'home',
// 			controller  : 'mainController'
// 		})

// 		//route for the about page
// 		.when('/about', {
// 			templateUrl : 'about',
// 			controller  : 'aboutController'
// 		})

// 		//route for the contact page
// 		.when('/contact', {
// 			templateUrl : 'layouts/contact.html',
// 			controller  : 'contactController'
// 		});

// 		// .otherwise({
// 		// 	redirectTo: '/'
// 		// });
// }

// proRubApp.config(handlebarsBinding, routering, locationing);

proRubApp.controller('mainController', function($scope){
	$scope.message = 'Is it working gah yet?';
});

proRubApp.controller('aboutController', function($scope){
	$scope.message = 'Look! I am an about page.';
});

proRubApp.controller('contactController', function($scope){
	$scope.message = 'Contact us! JK. This is just a demo.';
});




// app.controller('mainController', ['$scope', '$http', function($scope, $http){
// 	$http.get('/data.js').success(function(data){
// 		$scope.people
// 	})

// 	$scope.posts = [];
// 	$scope.newPost = {created_by: '', text: '', created_at: ''};

// 	$scope.post = function(){
// 		$scope.newPost.created_at = Date.now();
// 		$scope.posts.push($scope.newPost);
// 		$scope.newPost = {created_by: '', text: '', created_at: ''};
// 	};
// }]);

console.log("main.js is linked properly, this is where angular controller lies.");
