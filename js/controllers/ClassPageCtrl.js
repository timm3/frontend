appCtrls.controller('ClassPageCtrl', function($scope, ClassDetails) {
	$scope.classTitle = "CS 101";
	$scope.professor = "Mr. Computer";
	$scope.rating = "4.9/5.0";
	$scope.comments=[];
	$scope.post = function(){
		// ClassDetails.examplePost();
		ClassDetails.getData();
	}
});