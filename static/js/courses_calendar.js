/**
*	This function generate from course information an HTML div with that can be added to a calendar. 

*	@param courseInfo associated array of course info values
*	@return array of DOM objects that represent course from given information
*/
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
		course.style.height = getCourseBoxHeight(courseInfo.startTime, courseInfo.endTime) + "px";
		course.style.top = yCoordFromHour(courseInfo.startTime).toString() + "px";
		course.style.backgroundColor = getCourseColor(courseInfo.code); 
		course.innerHTML = courseInfo.subject;
		
		children.push(course);
	}
	
	children = attachRemoveButton(children, courseInfo);
	
	return children;
}

/**
 * This function creates a remove button for an array of given divs
 * and attaches the button to each div.
 * @param children an array of div DOM objects
 * @param courseInfo associated array of course info values
 * @returns array of DOM objects with attached a remove button child 
 */
function attachRemoveButton(children, courseInfo)
{
	for( var i = 0; i < children.length; i++ )
	{
		// create remove button for the course
		var button = document.createElement('button');
		button.setAttribute('class', 'remove_button');
		button.setAttribute('type', 'button');		
		button.setAttribute('value', 'remove course ' + courseInfo.crn);
		button.setAttribute('title', "Remove course " + courseInfo.subject + " that is on " + courseInfo.days + ".");
		button.innerHTML = 'x';
		
		button.onclick = function() {	   
			var parentsIds = dayTokenStringToDaysTimesIds(courseInfo.days);
			for( var i = 0; i < parentsIds.length; i++)
			{
				var parent = document.getElementById(parentsIds[ i ]);
				parent.removeChild(children[ i ]);
			}
	    
			return true;
		};
		
		children[ i ].appendChild(button);
	}
	
	return children;
}

/**
*	This function adds to calendar course from given course information.
* 	@param associated array of course info values
* 	@return boolean does not indicate anything - exists only to make browser happy
*/
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

/**
 * This function generates a RGBA color string appropriate to given course code.
 * @param courseCode string capitalized course code
 * @returns {string} string for CSS color value in RGBA format 'RGBA(hex, hex, hex, float)'
 */
function getCourseColor(courseCode)
{
	// Agricultural, Consumer and Environmental Sciences
	if( ("ABE" === courseCode) || ("ACE" === courseCode) || ("ACES" === courseCode) || ("AGED" === courseCode) || ("ANSC" === courseCode) || ("CPSC" === courseCode) || ("FSHN" === courseCode) || ("HDFS " === courseCode) || ("HORT" === courseCode)  || ("NRES" === courseCode) || ("NUTR" === courseCode) || ("PLPA" === courseCode) || ("RSOC" === courseCode) || ("TSM" === courseCode) )
	{
		return "rgba(0,245,45,0.8)";
	}
	// Applied Health Sciences
	else if( ("AHS" === courseCode) || ("CHLH" === courseCode) || ("IHLT" === courseCode) || ("KIN" === courseCode) || ("REHB" === courseCode) || ("RST" === courseCode) || ("SHS" === courseCode) )
	{
		return "rgba(170,156,255,0.8)"; //"#AA9CFF";
	}
	// Armed Forces
	else if( ("AFAS " === courseCode) || ("MILS" === courseCode) || ("NS" === courseCode) )
	{
		return "rgba(143,58,6,0.8)";
	}
	// Institute of Aviation
	else if( ("AVI" === courseCode) )
	{
		return "rgba(138,253,255,0.8)"; //"#8AFDFF";
	}
	// College of Business
	else if( ("ACCY" === courseCode) || ("BADM" === courseCode) || ("BUS" === courseCode) || ("FIN" === courseCode) || ("MBA" === courseCode) )
	{
		return "rgba(159,178,179,0.8)"; //"#9FB2B3";
	}
	// Education
	else if( ("CI" === courseCode) || ("EDPR" === courseCode) || ("EOL" === courseCode) || ("EPS" === courseCode) || ("EPSY" === courseCode) || ("HRD" === courseCode)  || ("HRE" === courseCode)  || ("SPED" === courseCode) )
	{
		return "rgba(0,252,126,0.8)"; //"#00FC7E";
	}
	// Engineering 
	else if( ("AE" === courseCode) || ("BIOE" === courseCode) || ("CEE" === courseCode) || ("CS" === courseCode) || ("CSE" === courseCode) || ("ECE" === courseCode)  || ("ENG" === courseCode)  || ("GE" === courseCode)  || ("IE" === courseCode) || ("ME" === courseCode) || ("MSE" === courseCode) || ("NPRE " === courseCode) || ("PHYS" === courseCode) || ("TAM" === courseCode) || ("TE" === courseCode) || ("TMGT" === courseCode) )
	{
		return "rgba(252,202,0,0.8)"; //"#FCCA00";
	}
	// Environmental Council
	else if( ("ENVS" === courseCode) )
	{
		return "rgba(94,94,94,0.8)"; //"#5E5E5E";
	}
	// Fine and Applied Arts
	else if( ("ARCH" === courseCode) || ("ART" === courseCode) || ("ARTD" === courseCode) || ("ARTE" === courseCode) || ("ARTF" === courseCode) || ("ARTH" === courseCode)  || ("ARTS " === courseCode)  || ("DANC" === courseCode) || ("FAA" === courseCode) || ("LA" === courseCode) || ("MUS" === courseCode) || ("THEA" === courseCode) || ("UP" === courseCode) )
	{
		return "rgba(255,191,191,0.8)"; //"#FFBFBF";
	}
	// Graduate College
	else if( ("CIC" === courseCode) || ("GC" === courseCode) || ("PSM" === courseCode) )
	{
		return "rgba(184,17,184,0.8)"; //"#B811B8";
	}
	// Division of General Studies
	else if( ("GS" === courseCode) )
	{
		return "rgba(100,17,184,0.8)"; //"#6411B8";
	}
	// Liberal Arts and Sciences
	else if( ("AAS" === courseCode) || ("AFRO" === courseCode) || ("AFST" === courseCode) || ("AIS" === courseCode) || ("ANTH" === courseCode) || ("ARAB" === courseCode)  || ("ASST" === courseCode)  || ("ASTR" === courseCode) || ("ATMS" === courseCode) || ("BASQ" === courseCode) || ("BCS" === courseCode) || ("BIOC" === courseCode) || ("BIOL" === courseCode) || ("BIOP" === courseCode) || ("BTW" === courseCode) || ("CATL" === courseCode) || ("CDB" === courseCode) || ("CHBE" === courseCode) || ("CHEM" === courseCode) || ("CHIN" === courseCode) || ("CHP" === courseCode) || ("CLCV" === courseCode) || ("CMN" === courseCode) || ("CW" === courseCode) || ("CZCH" === courseCode) || ("EALC" === courseCode) || ("ECON" === courseCode) || ("EIL" === courseCode) || ("ENGL" === courseCode) || ("ENSU" === courseCode) || ("ENT" === courseCode) || ("ESE" === courseCode) || ("ESL" === courseCode) || ("EURO" === courseCode) || ("FR" === courseCode) || ("GEOG" === courseCode) || ("GEOL" === courseCode) || ("GER" === courseCode) || ("GLBL" === courseCode) || ("GMC" === courseCode) || ("GRK" === courseCode) || ("GRKM" === courseCode) || ("GWS" === courseCode) || ("HCD" === courseCode) || ("HEBR" === courseCode) || ("HIST" === courseCode) || ("HNDI" === courseCode) || ("HUM" === courseCode) || ("IB" === courseCode) || ("ITAL" === courseCode) || ("JAPN" === courseCode) || ("JS" === courseCode) || ("KOR" === courseCode) || ("LAS" === courseCode) || ("LAST" === courseCode) || ("LAT" === courseCode) || ("LING" === courseCode) )
	{
		return "rgba(17,184,172,0.8)"; //"#11B8AC";
	}
	// Law
	else if( ("LAW" === courseCode) )
	{
		return "rgba(20,252,160,0.8)"; //"#14FCA0";
	}
	// Library and Information Sciences
	else if( ("LIS" === courseCode) )
	{
		return "rgba(163,252,20,0.8)"; //"#A3FC14";
	}
	// College of Media
	else if( ("ADV" === courseCode) || ("AGCM" === courseCode) || ("JOUR" === courseCode) || ("MACS" === courseCode) || ("MDIA" === courseCode) )
	{
		return "rgba(232,255,117,0.8)"; //"#E8FF75";
	}
	// Provost Academic Programs
	else if( ("INFO" === courseCode) )
	{
		return "rgba(227,227,227,0.8)"; //"#E3E3E3";
	}
	// School of Labor and Employee Relations
	else if( ("LER" === courseCode) )
	{
		return "rgba(56,224,157,0.8)"; //"#38E09D";
	}
	// School of Social Work
	else if( ("SOCW" === courseCode) )
	{
		return "rgba(0,133,102,0.8)"; //"#008566";
	}
	// Veterinary Medicine
	else if( ("CB" === courseCode) || ("PATH" === courseCode) || ("VCM" === courseCode) || ("VM" === courseCode) )
	{
		return "rgba(0,252,236,0.8)"; //"#00FCEC";
	}
	// else
	else 
	{
		return "rgba(255,36,36,0.8)"; //"#FF2424";
	}
}