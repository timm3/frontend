'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var appServices = angular.module('RegNow.services', []);

appServices.service("UserViewClass", function($rootScope, $http){
	var subject = null;
	var subjectId = null;
	var classData = null;

	this.update = function(sub, id){
		subject = sub;
		subjectId = id;
	};
	this.getSubject = function(){
		return subject;
	};
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