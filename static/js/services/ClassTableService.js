appServices.service("ClassDetails", function($rootScope, $http){
	var subjects = null;
	var filteredSubjects = null;
	var subjectIds = null;
	var filteredIds = null;
	var courseSections = null;
	var classInfo = null;
	var hasFilter = false;

	this.getInfo = function(){
		return classInfo;
	};
	this.getCourseSections = function(){
		return courseSections;
	};
	this.getSubjects = function(){
		if(filteredSubjects !== null){
			return filteredSubjects;
		}
		return subjects;
	};
	this.getIds = function(sub){
		if(filteredIds !== null){
			return filteredIds[sub];
		}
		return subjectIds;
	};
	this.updateHasFilter = function(bool){
		hasFilter = bool;
		filteredIds = null;
		filteredSubjects = null;
	};
	this.getHasFilter = function(){
		return hasFilter;
	};

	function extractFilteredInfo(coursesArray){
		filteredIds = [];
		filteredSubjects = [];
		for(var course in coursesArray){
			if( filteredSubjects.indexOf(coursesArray[course].code) === -1 ){
				filteredSubjects.push(coursesArray[course].code);
			}
			if(!filteredIds[coursesArray[course].code]){
				filteredIds[coursesArray[course].code] = [];
				filteredIds[coursesArray[course].code].push(coursesArray[course].course_id);
			}
			else{
				filteredIds[coursesArray[course].code].push(coursesArray[course].course_id);
			}
		}
		filteredSubjects.sort();
	}
	/**
	 *	HTTP request to server. Asking for the subject codes.
	 */
	this.httpGetSubjects= function(){
		$http.get('/getSubjects')
			.success(function(data, status, headers, config){
				if(data.success){
					subjects = data.subjectCodes;
					if(!subjects[0]){
						subjects.splice(0, 1);
						console.log("empty");	
					} 
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
			});
	};
	/**
	 *	HTTP request to server. Asking for the subject codes, based on certain filter.
	 */
	this.postFilter = function(filter){
		$http.post('/postFilter',{
			'filter':filter
			}).success(function(data, status, headers, config){
				if(data.success){
					extractFilteredInfo(data.filteredClasses);
					// console.log(data.filteredClasses);
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
			});
	};
	/**
	 *	HTTP request to server. Asking for course ids based on specific subject
	 */
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
	/**
	 *	HTTP request to server. Asking for detailed information of class specified with subject and id.
	 */
	this.getSections = function(subject, id){
		console.log("function: getSections");
		$http.post('/postSpecificClass',{
			'sub':subject,
			'subId':id
			}).success(function(data, status, headers, config){
				if(data.success){
					classInfo = data.classInfo;
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