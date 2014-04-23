/**
 *	This is made so that when changing pages in the app, some of the info is saved
 */
appServices.service("SaveClassInfo", function(){
	var selectedSubject = null;
	var selectedId = null;
	var classesAdded = [];

	/* getters and setters of saved info*/
	this.getSelectedSubject = function(){
		return selectedSubject;
	};
	this.setSelectedSubject = function(subject){
		selectedSubject = subject;
	};
	this.getSelectedId = function(){
		return selectedId;
	};
	this.setSelectedId = function(id){
		selectedId = id;
	};
	this.getClassesAdded = function(){
		return classesAdded;
	};
	this.pushClass = function(course){
		classesAdded.push(course);
	};
});
