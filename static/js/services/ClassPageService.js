appServices.service("ClassDetails", function($rootScope, $http){
	var courseData = null;
	var subjectIds = null;
	var courseSections = null;

	this.getCourseSections = function(){
		return courseSections;
	};
	this.getData = function(){
		return courseData;
	};
	this.getIds = function(){
		return subjectIds;
	};
	this.callGet= function(){
		$http.get('/getSubjects')
			.success(function(data, status, headers, config){
				if(data.success){
					courseData = data.subjectCodes;
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
			});
	};
	this.postSubject = function(subject){
		console.log("function: postSubjec()");
		$http.post('/postCourseIds',{
			'sub':subject
			}).success(function(data, status, headers, config){
				if(data.success){
					subjectIds = data.subjectIds.sort();
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
			});
	};
	this.getSections = function(subject, id){
		console.log("function: getSections");
		$http.post('/postSpecificClass',{
			'sub':subject,
			'subId':id
			}).success(function(data, status, headers, config){
				if(data.success){
					classData = data.classInfo;
					courseSections = data.times;
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
		});
	};
});