 
var prorubControllers = angular.module('prorubControllers', []);

prorubControllers.controller('homeCtrl', ['$scope', '$http',
  function ($scope, $http) {
     $http.get('/views/home.html').success(function(data) {
      $scope.home = data;
    });
  }]);

prorubControllers.controller('addDegreeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('adddegree.html').success(function(data) {
      $scope.course = data;
    });
  }]);
prorubControllers.controller('degreeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('degree.html').success(function(data) {
      $scope.course = data;
    });
  }]);

prorubControllers.controller('addCourseCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('addcourse.html').success(function(data) {
     $scope.course = data;
    });
  }]);
