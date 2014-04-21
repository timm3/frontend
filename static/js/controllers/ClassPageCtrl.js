appCtrls.controller('ClassPageCtrl', ['$scope', '$location','ClassPageService',
	function($scope, $location, ClassPageService) {
	$scope.ClassPageService = ClassPageService
	// $scope.ClassPageService.postSubject(ClassPageService.getSubject(), ClassPageService.getSubjectId());
	$scope.course = ClassPageService.getClassData();
	$scope.classSection = ClassPageService.getClassSection();
	if(ClassPageService.getSubject()==null){
		$location.path("/ClassTablePage");
	}
	console.log("class Section:");
	console.log(ClassPageService.getClassSection());
	console.log($scope.course);
	/**
	 *	Watches for update of course selected, and getting the class details
	 */
	// $scope.$watch('ClassPageService.getClassData()', function(newVal, oldVal){
	// 	if(newVal==null){
	// 		return;
	// 	}
	// 	$scope.course = newVal;
	// 	console.log($scope.course);
	// });

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
		// ClassDetails.getData();
	}
}]);