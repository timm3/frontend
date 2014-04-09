function addCourse(day_column_id) 
{
	var o1 = {code: "MATH", subject: "Calc III", crn: "10145", startTime: '01:00 PM', endTime: '01:50 PM', days: 'MWF '}; // temporary class info object
	
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
	course.style.height = '30px';
	course.style.top = '449.5px';
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

/**
 * This function checks if the time string is in the correct format. 
 * Correct format: 'HH:MM AM' or 'HH:MM PM'.
 * @param time string 
 * @returns {Boolean} ture if time argument matches the correct format. false is not
 */
function isCorrectFormat(time)
{
	var pattern = "[0-1]{1}[0-9]{1}[:][0-5][0-9] [AM|PM]";
	var timeRegex = new RegExp(pattern);  
	
	if( time.length != 8)
	{
		return false;
	}
	
	if( !timeRegex.test(time) )
	{
		return false;
	}

	// tokenize time
	var tokTime = time.split('');
	var digitsHour = tokTime[0] + tokTime[1];
	var digitsMinute = tokTime[3] + tokTime[4];
	var dayTime = tokTime[6] + tokTime[7];
	
	var hours = parseInt(digitsHour);
	var minutes = parseInt(digitsMinute);
	
	if( (hours < 1) || (hours > 12) )
	{
		return false;
	}
	if( (minutes < 0) || (minutes > 59) )
	{
		return false;
	}
	
	return true;
}

/**
 * This function calculates the y-coordinate on a aday_time div 
 * for a course with given time.
 * @param time string 
 * @returns {Number} y-coordinate relative to given time string 
 * or -1 if time string is incorrect
 */
function yCoordFromHour(time)
{
	// parse time string
	var tokTime = time.split('');
	var digitsHour = tokTime[0] + tokTime[1];
	var digitsMinute = tokTime[3] + tokTime[4];
	var dayTime = tokTime[6] + tokTime[7];
	
	var hours = parseInt(digitsHour);
	var minutes = parseInt(digitsMinute);
	
	var hourPixelHeight = 30;
	var minuteInPixels = hourPixelHeight/60;
	var calendarStartHour = 8;
	var hoursFromStartHourToNoon = 12 - calendarStartHour;
	
	var hourMultiplier = 0;
	var yCoordinate = -1;
	
	// check if time matches pattern
	if( !isCorrectFormat(time) )
	{
		return yCoordinate;
	}
	
	// calculate hourMultiplier 
	if( dayTime == 'AM' )
	{
		if( (hours == 12) || (hours < calendarStartHour) )
		{
			return yCoordinate;
		}
		else
		{
			hourMultiplier = hours - calendarStartHour;
		}
	}
	else
	{
		if( hours == 12 )
		{
			hourMultiplier = hours - calendarStartHour;
		}
		else
		{
			hourMultiplier = hours + hoursFromStartHourToNoon;
		}
	}
	
	yCoordinate = (hourMultiplier * hourPixelHeight) + (minuteInPixels * minutes);
	
	return yCoordinate;
}













