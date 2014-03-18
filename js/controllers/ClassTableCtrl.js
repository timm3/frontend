appCtrls.controller("ClassTableCtrl", function($scope){
	$scope.classSelected = false;
	$scope.subjectSelected = 0;
	$scope.subjects = [
		{subject:"sub1", id:0},
		{subject:"sub2", id:1},
		{subject:"sub3", id:2}];
	$scope.courseNumbers =[
		[{courseNum:100, crn:111},{courseNum:101, crn:112},{courseNum:102, crn:113},{courseNum:103, crn:114},{courseNum:104, crn:115}],
		[{courseNum:200, crn:211},{courseNum:201, crn:212},{courseNum:202, crn:213},{courseNum:203, crn:214},{courseNum:204, crn:215}],
		[{courseNum:300, crn:311},{courseNum:301, crn:312},{courseNum:302, crn:313},{courseNum:303, crn:314},{courseNum:304, crn:315}]];

	$scope.showClasses = function(subject){
		$scope.classSelected = true;
		$scope.subjectSelected = subject;
	};
});