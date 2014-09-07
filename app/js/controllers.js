'use strict';

/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('phones/phones.json').success( function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
  }
]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('phones/' + $routeParams.phoneId + '.json').success(
        function(data) {
          $scope.phone = data;
          $scope.mainImageUrl = data.images[0];
        }
    );
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }
]);