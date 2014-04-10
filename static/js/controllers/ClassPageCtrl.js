appCtrls.controller('ClassPageCtrl', ['$scope', 'UserViewClass',function($scope, UserViewClass) {
	$scope.userViewClass = UserViewClass
	$scope.subject = UserViewClass.getSubject();
	$scope.subjectId =UserViewClass.getSubjectId();
	$scope.professor = "Some old guy";
	$scope.rating = "3.0";
	$scope.comments=[];
	$scope.post = function(){
		// ClassDetails.examplePost();
		ClassDetails.getData();
	}
}]);