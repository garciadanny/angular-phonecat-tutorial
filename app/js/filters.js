'use strict';

/* Filters */

angular.module('phonecatFilters', []).filter('checkmark',
    function() {
      return function(bool) {
        return bool ? '\u2713' : '\u2718'
      };
    }
);