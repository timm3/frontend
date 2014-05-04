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
		for(var i in classesAdded){
			if(hasOverlappingDays(course.days.trim(), classesAdded[i].days.trim())){
				console.log(course);
				console.log(classesAdded[i]);
				var newStart = stringToTime(course.startTime)
				var newEnd = stringToTime(course.endTime)
				var addedStart = stringToTime(classesAdded[i].startTime)
				var addedEnd = stringToTime(classesAdded[i].endTime)
				if( (newStart >= addedStart && newEnd <= addedEnd) || 
					(newStart <= addedStart && newEnd >= addedEnd ) ||
					(newStart <= addedStart && newEnd <= addedStart) ||
					(newStart >= addedStart && newStart <= addedEnd) ){
					alert("This class conflicts with " + classesAdded[i].code + " " + + classesAdded[i].id);
					return false;
				}
			}
		}
		classesAdded.push(course);
		return true;
	};
	/*check to see if classes overlap on some days*/
	function hasOverlappingDays(days1, days2){
		if(!days1 || !days2){
			return false;
		}
		for(var i = 0; i<days1.length; i++){
			if( days2.indexOf(days1.charAt(i)) > -1 ){
				console.log('has similar days');
				return true;
			}
		}
		return false;
	}

	/* check to see if the times overlap. */
	function stringToTime(str){
		if(!str){
			return null;
		}
		var timeSplit = str.split(":");
		if(timeSplit.length<2){
			console.log("stringToTime :");
			return null;
		}
		var hour = parseInt(timeSplit[0])*100;
		var minutes = parseInt(timeSplit[1]);
		if(str.indexOf("PM") > 0){
			if(hour !== 1200){
				hour+=1200;
			}
		}
		return hour+minutes;
	}
});
