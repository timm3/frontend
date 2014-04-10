'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var appServices = angular.module('RegNow.services', []);

appServices.service("UserViewClass", function($rootScope, $http){
	var subject = null;
	var subjectId = null;

	this.update = function(sub, id){
		subject = sub;
		subjectId = id;
	};
	this.getSubject = function(){
		return subject;
	};
	this.getSubjectId = function(){
		return subjectId;
	}
});