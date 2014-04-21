appCtrls.controller("ClassTableCtrl", ['$scope', '$location', 'ClassDetails', 'UserViewClass', 'mySearch',
	function($scope, $location, ClassDetails,UserViewClass, mySearch){

	// $scope.userViewClass = UserViewClass;
	$scope.classDetails = ClassDetails;
	$scope.classDetails.callGet();
	$scope.selectedId = null;
	$scope.selectedSubject = null;
	$scope.courseNumbers = [];
	$scope.subjects = null;
	$scope.classSections = null;
	$scope.classInfo = null;
	$scope.searchCourseNumber = null;
	$scope.searchSubject = null;
	$scope.mySearch = mySearch;
	/**
	 *	Will add the class to the calendar below the table, 
	 *	will also add it to  the list of classes to be added.
	 */
	$scope.addClass = function(classSection){
		console.log(classSection);
		addToCalendar({code: $scope.selectedSubject, 
			subject: $scope.classInfo.class_title, 
			crn: classSection.crn, 
			startTime: classSection.start, 
			endTime: classSection.end, 
			days: classSection.days_of_week})
		// $scope.$apply();
	};
	$scope.$watch('mySearch.getSearch()', function(newVal, oldVal){
		if(newVal !== null){
			var classSearch = newVal.trim().split(" ");
			$scope.searchSubject = classSearch[0].toUpperCase();
			$scope.search
			console.log($scope.searchSubject);
			if($scope.subjects.indexOf($scope.searchSubject) !== -1){
				$scope.selectedSubject = $scope.searchSubject;
				$scope.showClasses($scope.selectedSubject);
			}
			$scope.searchCourseNumber = classSearch[1];
			if($scope.courseNumbers!==null && $scope.courseNumbers.indexOf($scope.searchCourseNumber) !== -1){
				$scope.selectedId = $scope.searchCourseNumber;
				$scope.updateSelectedId($scope.searchCourseNumber);
			}
		}

	});
	/**
	 *	When the function getData() returns a new value, update the subjects.
	 *	It starts off returning null, and once the http call comes back it updates, because it is 
	 *	asynchronous.
	 */
	$scope.$watch('classDetails.getData()', function(newVal, oldVal){
		$scope.subjects = newVal;
	});
	/**
	 *	watch for change of coursenumbers, and then update it once it changes.
	 */
	$scope.$watch('classDetails.getIds()', function(newVal, oldVal){
		$scope.courseNumbers = newVal;
	});
	/**
	 *	Updates the course sections based on the class chosen.
	 */
	$scope.$watch('classDetails.getCourseSections()', function(newVal, oldVal){
		$scope.classSections = newVal;
		// console.log($scope.classSections);
	});
	/**
	 *	Updates the course sections based on the class chosen.
	 */
	$scope.$watch('classDetails.getInfo()', function(newVal, oldVal){
		$scope.classInfo = newVal;
		// console.log($scope.classInfo.class_title);
	});
	/**
	 *
	 */
	$scope.showClasses = function(subject){
		$scope.classDetails.postSubject(subject);
		$scope.selectedSubject = subject;
		//reset the selected information so that the wont be errors later.
		$scope.classSections = null;
		$scope.selectedId = null;
	};
	/**
	 *
	 */
	$scope.updateSelectedId = function(id){
		$scope.selectedId = id;
		$scope.classDetails.getSections($scope.selectedSubject, $scope.selectedId);
		
	};

	/**
	 *	Routes you to the class page, with all the details about the class selected.
	 */
	$scope.viewClass= function(){
		UserViewClass.update($scope.selectedSubject, $scope.selectedId);
		$location.path("/ClassPage");
	};

	/*search criteria*/
	$scope.searchOptions = new search();
	$scope.hours;

	/**
	 *	Function, to add multiple credit hours in search options
	 */
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

	/**
	 *	Will remove the specified credit hours from the list of credit hours that are being searched.
	 */
	$scope.removeCreditHours = function(hours){
		for(var i=0; i<$scope.searchOptions.creditHours.length; i++){
			if($scope.searchOptions.creditHours[i] === hours){
				$scope.searchOptions.creditHours.splice(i,1);
				return;
			}
		}
	};

	/**
	 *	If all the correct fields are filled out for the filter form, then the button will activate.
	 */
	$scope.validForm = function(){
		return !$scope.searchOptions.minGpa && 
		!$scope.searchOptions.minProfRating && 
		$scope.searchOptions.creditHours.length==0;
	}

}]);

/**
 *
 */
function search(){
	this.minGpa = null;
	this.creditHours = [];
	this.minProfRating = null;

}
