appCtrls.controller("ClassTableCtrl", ['$scope', 'ClassDetails', function($scope, ClassDetails){
	
	$scope.checkGet = function(){
		var data = ClassDetails.getData();
		// console.log(data);
	};

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

	$scope.watch(ClassDetails.getData(), function(val){
		$scope.subjects = val;
	});
	// function idk(){
	// 	$scope.$apply(function(){
	// 		alert("hi234");
	// 		$scope.subjects.push({subject:"sub4", id:3});
	// 		// $scope.subjects = ClassDetails.getData();
	// 	});
	// }
	// idk();
	$scope.showClasses = function(subject){
		$scope.classSelected = true;
		$scope.subjectSelected = subject;
	};

	/*search criteria*/
	$scope.searchOptions = new search();
	$scope.hours;
	//function, to add multiple credit hours in search options
	$scope.addCreditHours = function(hours){
		//Why would you add more than 5 options. I don't want them too... stupid students.
		if($scope.searchOptions.creditHours.length >= 5){
			return;
		}
		for(var hr in $scope.searchOptions.creditHours){
			console.log(hr);
			if($scope.searchOptions.creditHours[hr]=== hours){
				return;
			}
		}
		$scope.searchOptions.creditHours.push(hours);
	};

	//will remove the specified credit hours from the list of credit hours that are being searched.
	$scope.removeCreditHours = function(hours){
		for(var i=0; i<$scope.searchOptions.creditHours.length; i++){
			if($scope.searchOptions.creditHours[i] === hours){

				return;
			}
		}
	};
}]);

function search(){
	this.minGpa = null;
	this.creditHours = [];
	this.minProfRating = null;

}