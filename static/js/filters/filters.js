'use strict';

/* Filters 
	credit hour
	gpa
	prof rating
	course time
*/

angular.module('ClassScheduler.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
