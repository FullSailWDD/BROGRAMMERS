 
var prorubControllers = angular.module('prorubControllers', []);

prorubControllers.controller('homeCtrl', ['$scope', '$http',
  function ($scope, $http) {
     $http.get('/templates/index.html').success(function(data) {
      $scope.home = data;
    });
  }]);

prorubControllers.controller('addDegreeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('addDegree.html').success(function(data) {
      $scope.course = data;
    });
  }]);

prorubControllers.controller('addCourseCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('addCourse.html').success(function(data) {
     $scope.course = data;
    });
  }]);
