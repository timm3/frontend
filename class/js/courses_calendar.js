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
	
	button.onclick = function() {	   
	    parentNode.removeChild(course);
	    
	    return true;
	  };

	return course;
}



function creteCourseDiv(courseInfo)
{
	var parents = dayTokenStringToDaysTimesIds(courseInfo.days);
	var children = new Array();
	
	for( var i = 0; i < parents.length; i++ )
	{
		// create div for the course
		var course = document.createElement('div');
		var courseId = "course_" + courseInfo.crn + "_" + parents[ i ];
		course.setAttribute('id', courseId);
		course.className = "course_entry";
		course.style.height = getCourseBoxHeight(courseInfo.startTime, courseInfo.endTime);
		
		course.style.top = yCoordFromHour(courseInfo.startTime).toString() + "px";
		console.log(toString(yCoordFromHour(courseInfo.startTime)) + "px");
		
		course.innerHTML = courseInfo.subject;
		
		children.push(course);
	}
	
	for( var i = 0; i < children.length; i++ )
	{
		// create remove button for the course
		var button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.setAttribute('value', 'remove course ' + courseInfo.crn);
		button.setAttribute('title', "Remove course " + courseInfo.subject + " that is on " + courseInfo.days + ".");
		button.innerHTML = '-';
		
		button.onclick = function() {	   
			var parentsIds = dayTokenStringToDaysTimesIds(courseInfo.days);
			for( var i = 0; i < parentsIds.length; i++)
			{
				var parent = document.getElementById(parentsIds[ i ]);
				parent.removeChild(children[ i ]);
				console.log("remove " + i);
			}
	    
			return true;
		};
		
		children[ i ].appendChild(button);
	}
	
	return children;
}


function addToCalendar(courseInfo)
{
	var children = creteCourseDiv(courseInfo);
	
	var parentsIds = dayTokenStringToDaysTimesIds(courseInfo.days);
	for( var i = 0; i < parentsIds.length; i++)
	{
		var parent = document.getElementById(parentsIds[ i ]);
		parent.appendChild(children[ i ]);
	}
	
	return true;
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

/**
 * This function matches a day token with a div id in the calendar where 
 * a course with given token has to be inserted.
 * @param dayTok string character token representation of a day
 * @returns null if no match is found, string name of div id on match
 */
function dayTokenToDayTimesId(dayTok)
{
	var aDayTimesIds = ['sunday_times', 'monday_times', 'tuesday_times', 'wednesday_times', 'thursday_times', 'friday_times', 'saturday_times'];
	var tokens = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
	var divId = null;
	
	for( var i = 0; i < aDayTimesIds.length; i++ )
	{
		if( tokens[i] === dayTok )
		{
			divId = aDayTimesIds[i];
			break;
		}
	}
	
	return divId;
}

/**
 * This function gets an array of div IDs where a course will be placed.
 * @param days string representation of days in form of one letter for each day of the week 'UMTWRFS'
 * @returns {Array} of div IDs as strings
 */
function dayTokenStringToDaysTimesIds(days)
{
	var tokDays = days.split('');
	var dayColumnsIds = new Array();
	
	for( var i = 0; i < tokDays.length; i++	)
	{
		var dayDivId = dayTokenToDayTimesId(tokDays[i]);
		if( dayDivId != null )
		{
			dayColumnsIds.push(dayDivId);
		}
	}
	
	return dayColumnsIds;
}

/**
 * This function calculates height in pixels of a course box.
 * Input start and end times must be within allowed time range by the calendar.
 * @param startTime string representation of course start time
 * @param endTime string representation of course end time
 * @returns {Number} integer height of the box in pixels
 */
function getCourseBoxHeight(startTime, endTime)
{
	var boxWidth = -1;
	
	var startCoord = yCoordFromHour(startTime);
	var endCoord = yCoordFromHour(endTime);
	
	if( startCoord < 0 || endCoord < 0 )
	{
		return -1;
	}
	
	boxWidth = endCoord - startCoord;
	
	if( boxWidth < 0 )
	{
		return -1;
	}
	
	return boxWidth;
}






