appCtrls.controller('ClassPageCtrl', ['$scope', 'UserViewClass',function($scope, UserViewClass) {
	$scope.userViewClass = UserViewClass
	$scope.userViewClass.postSubject(UserViewClass.getSubject(), UserViewClass.getSubjectId());
	
	/**
	 *	Watches for update of course selected, and getting the class details
	 */
	$scope.$watch('userViewClass.getClassData()', function(newVal, oldVal){
		if(newVal==null){
			return;
		}
		$scope.courseNumbers = newVal;
		// console.log($scope.courseNumbers);
	});

	/**
	 *	Will add a comment to this class.  Add the comment to the database.
	 */
	$scope.leaveComment = function(){

	};

	/**
	 * Will add class with this crn to the queue of classes to be added for the user.
	 */
	$scope.addClass = function(){

	};

	$scope.post = function(){
		// ClassDetails.examplePost();
		ClassDetails.getData();
	}
}]);