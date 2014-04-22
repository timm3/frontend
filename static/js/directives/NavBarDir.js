appDir.directive("navbar", ["$location", '$location', 'mySearch',function($location, mySearch){
	return{
		restrict:"E",
		controller: function($scope, $location, mySearch){
			$scope.signUp = function(){
				$location.path("/SignUp");
			}

			$scope.searchInput = null;
			$scope.$watch('searchInput', function(newVal){
				// mySearch.searchInput = $scope.searchInput;
				mySearch.setSearch(newVal);
			});
			$scope.submitSearch = function(){
				$location.path('/ClassTablePage');
			};
		},
		templateUrl:"/static/partials/NavBar.html"
	};
}]);