appCtrls.controller("ClassTableCtrl", ['$scope', '$location', 'ClassDetails', 'UserViewClass', 
	function($scope, $location, ClassDetails,UserViewClass){

	// $scope.userViewClass = UserViewClass;
	$scope.classDetails = ClassDetails;
	$scope.classDetails.callGet();
	$scope.selectedId = null;
	$scope.selectedSubject = 0;
	
	$scope.$watch('classDetails.getData()', function(newVal, oldVal){
		$scope.subjects = newVal;
	});
	/* watch for change of coursenumbers, and then update it once it changes.*/
	$scope.$watch('classDetails.getIds()', function(newVal, oldVal){
		$scope.courseNumbers = newVal;
		console.log($scope.courseNumbers)
	});

	$scope.showClasses = function(subject){
		$scope.classDetails.postSubject(subject);
		$scope.selectedSubject = subject;
	};
	$scope.updateSelectedId = function(id){
		$scope.selectedId = id;
	}
	$scope.viewClass= function(){
		UserViewClass.update($scope.selectedSubject, $scope.selectedId);
		$location.path("/ClassPage");
	}
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