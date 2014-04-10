appServices.service("ClassDetails", function($rootScope, $http){
	var courseData = null;
	var subjectIds = null;
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
					// console.log(data.subjectCodes);
					// $rootScope.$apply();
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
		$http.post('/postCourseIds',{
			'sub':subject
			}).success(function(data, status, headers, config){
				if(data.success){
					subjectIds = data.subjectIds.sort();
					// $rootScope.$apply();
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
			});
	};
	this.examplePost= function(){
		console.log("post called");
		var data = {msg:"hi", num: 2};
		$http.post('/tmp', data).success(function(){
			console.log("post success called");
		});
	};
});