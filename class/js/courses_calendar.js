function addCourse(day_column_id) 
{
	var o1 = {code: "MATH", subject: "Calc III", crn: "10145", startTime: '01:00 PM', endTime: '02:30 PM', days: 'MWF '}; // temporary class info object
	
	var day_col = document.getElementById(day_column_id);
	var newChild = createCourse(o1, day_col);
	day_col.appendChild(newChild);
	
	// set all day_times height to days_column
	//console.log(day_col.offsetHeight);
	var aDayTimesElements = document.getElementsByClassName('aday_times');

}

function createCourse(courseInfo, parentNode)
{
	var course = document.createElement('div');
	course.setAttribute('id', "course_" + courseInfo.crn);
	course.className = "course_entry";
	course.style.height = '150px';
	course.style.top = '200px';
	course.innerHTML = courseInfo.subject;
	
	// create remove button
	var button = document.createElement('button');
	course.appendChild(button);
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'remove course ' + courseInfo.crn);
	button.setAttribute('title', "Remove course " + courseInfo.subject + " that is on " + courseInfo.days + ".");
	button.innerHTML = '-';
	
	button.onclick = function(){	   
	    parentNode.removeChild(course);
	    
	    return true;
	  };

	return course;
}