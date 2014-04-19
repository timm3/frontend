appCtrls.controller('ClassPageCtrl', ['$scope', 'UserViewClass',function($scope, UserViewClass) {
	$scope.userViewClass = UserViewClass
	$scope.userViewClass.postSubject(UserViewClass.getSubject(), UserViewClass.getSubjectId());
	$scope.$watch('userViewClass.getClassData()', function(newVal, oldVal){
		if(newVal==null){
			return;
		}
		$scope.courseNumbers = newVal;
		console.log($scope.courseNumbers);
	});
	$scope.post = function(){
		// ClassDetails.examplePost();
		ClassDetails.getData();
	}
}]);