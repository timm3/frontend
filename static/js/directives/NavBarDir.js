appDir.directive("navbar", ["$location", '$location', 'mySearch',function($location, mySearch){
	return{
		restrict:"E",
		controller: function($scope, $location, mySearch){
			$scope.logout = function(){
				alert("implement logout function");
			};

			$scope.searchInput = null;
			$scope.$watch('searchInput', function(newVal){
				// mySearch.searchInput = $scope.searchInput;
				mySearch.setSearch(newVal);
			});
			$scope.submitSearch = function(){
				console.log("clicked");
				$location.path('/ClassTablePage');
			};
		},
		templateUrl:"/static/partials/NavBar.html"
	};
}]);