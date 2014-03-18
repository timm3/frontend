appDir.directive("navbar", ["$location", function($location){
	return{
		restrict:"E",
		controller: function($scope, $location){
			$scope.logout = function(){
				alert("implement logout function");
			};
		},
		templateUrl:"partials/NavBar.html"
	};
}]);