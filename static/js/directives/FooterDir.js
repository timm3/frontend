appDir.directive("myFooter", function(){
	return{
		restrict:"E",
		controller: function($scope, $location, $anchorScroll){
			$scope.toTop = function(){
				  $location.hash("top");
				  $anchorScroll();	
			};
		},
		templateUrl:"/static/partials/Footer.html"
	};
});