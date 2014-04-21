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
			scope.changeActiveSubject = function(){
				console.log(attrs.id);
				var oldElement;
				//This makes it so that this directive can be used for both lists.
				if(attrs.temp === "subject"){
					//If the element list isn't empty, then there is already an active element. pop it
					if(scope.elems[0].length > 0){
						oldElement=scope.elems[0].shift();
					}
					//push the new element that will be active.
					scope.elems[0].push(element);
					//if old element has a value, then we don't want it to be highlighted anymore
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
			};
			//This watches for when the selected subject is changed from searching
			attrs.$observe('selectedData', function(val){
				//change the active subject or course id only if the selected subject or course id is changed
				//from search
				if(attrs.id === val){
					scope.changeActiveSubject();
				}
			});
			//when clicking on a list element, we want to change the course
			element.bind("click", function(){
				scope.changeActiveSubject();
			});
		}
	};
});