// var proRubApp = angular.module('proRubApp', [])
// .config(['$interpolateProvider', function($interpolateProvider, $routeProvider){
// 	$interpolateProvider.startSymbol('{[{');
// 	$interpolateProvider.endSymbol('}]}'); 
// }])
var proRubApp = angular.module('proRubApp',[]);

//This allows angular binding inside a handlebars template
function handlebarsBinding($interpolateProvider) {
    $interpolateProvider.startSymbol('((').endSymbol('))');
}

function locationing($locationProvider){
	// use the HTML5 History API
	$locationProvider.html5Mode(true);
}

function routering($routeProvider) {
	$locationProvider.html5Mode(true);

    $routeProvider 
		//route for the home page
		.when('/', {
			templateUrl : 'layouts/home.html',
			controller  : 'mainController'
		})

		//route for the about page
		.when('/about', {
			templateUrl : 'layouts/about.handlebars',
			controller  : 'aboutController'
		})

		//route for the contact page
		.when('/contact', {
			templateUrl : 'layouts/contact.html',
			controller  : 'contactController'
		});
}

proRubApp.config(handlebarsBinding, routering, locationing);














// proRubApp.config(function($routeProvider){
// 	$routeProvider 
// 		//route for the home page
// 		.when('/', {
// 			templateUrl : 'pages/home.html',
// 			controller  : 'mainController'
// 		})

// 		//route for the about page
// 		.when('/about', {
// 			templateUrl : 'pages/about.html',
// 			controller  : 'aboutController'
// 		})

// 		//route for the contact page
// 		.when('/contact', {
// 			templateUrl : 'pages/contact.html',
// 			controller  : 'contactController'
// 		});
// });

proRubApp.controller('mainController', function($scope){
	$scope.message = 'Everyone come and see how good I look!';
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