'use strict';

/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http', 'Phone',
  function ($scope, $http, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }
]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$http', '$routeParams', 'Phone',
  function($scope, $http, $routeParams, Phone) {

    $scope.phone = Phone.get({phoneId: $routeParams.phoneId},
        function(phone) {
          $scope.mainImageUrl = phone.images[0];
        }
    );
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }
]);