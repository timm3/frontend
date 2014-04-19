'use strict';

/* Directives */
var appDir = angular.module('RegNow.directives', ['ui.calendar','ui.bootstrap']);

appDir.directive("parentDir", function(){
	return{
		restrict:"A",
		controller: function($scope){
			$scope.elems = [];
			$scope.elems.push([]);
			$scope.elems.push([]);
		}
	};
});
/*
	This directive makes a list for the 
*/
appDir.directive("selectFromList", function(){
	return{
		restrict:"A",
		controller: function($scope){
		},
		link: function(scope, element, attrs){
			element.bind("click", function(){
				var oldElement;
				if(attrs.temp === "subject"){
					if(scope.elems[0].length > 0){
						oldElement=scope.elems[0].shift();
					}
					scope.elems[0].push(element);
					if(oldElement){
						oldElement.removeClass("active");
					}
					element.addClass("active");
				}
				if(attrs.temp === "courseNumber"){
					if(scope.elems[1].length > 0){
						oldElement=scope.elems[1].shift();
					}
					scope.elems[1].push(element);
					if(oldElement){
						oldElement.removeClass("active");
					}
					element.addClass("active");
				}
				
			});
		}
	};
});