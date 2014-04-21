appServices.service("ClassPageService", function($rootScope, $http){
	var subject = null;
	var subjectId = null;
	var classSection = null;
	var classData = null;

	this.update = function(sub, id, section, data){
		subject = sub;
		subjectId = id;
		classSection = section;
		classData = data;
	};
	this.getSubject = function(){
		return subject;
	};
	this.getClassSection = function(){
		return classSection;
	}
	this.getSubjectId = function(){
		return subjectId;
	};
	this.getClassData = function(){
		return classData;
	}
	this.postSubject = function(subject, id){
		$http.post('/postSpecificClass',{
			'sub':subject,
			'subId':id
			}).success(function(data, status, headers, config){
				if(data.success){
					classData = data.classInfo;
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
});