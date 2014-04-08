function printAllCourses(courses)
{
	var tableDim = {boxWidth: 100, margin: 10, boxHeight: 45};
	
	var eventBoxes = new Array();
	for( var i = 0; i < courses.length; i++ )
	{
		var courseBoxes = courseToEventData(courses[i], (Math.random()*1000 + 1));
		eventBoxes = eventBoxes.concat(courseBoxes);
	}
	
	var stage = new Kinetic.Stage({
        container: 'kinetic_container',
        width: 800,
        height: 500
      });
	
	for( var i = 0; i < eventBoxes.length; i++ )
	{
		printEventInTable(eventBoxes[i], tableDim, stage);
	} 
}


function courseToEventData(course, seed)
{
	var courseBoxes = new Array();
	var days = course.days.split('');
	var courseColor = '#' + genColor(seed);
	
	for( var i = 0; i < days.length; i++)
	{
		if( !(days[i] === ' ') )
		{
			var newEvent = {time: course.startTime, day: days[i], elementInPosition: 0, eleOnSameHorizontal: 1, fillcol: courseColor};
			courseBoxes.push(newEvent);
		}
	}
	
	return courseBoxes;
}


function genColor(seed) {
    color = Math.floor((Math.abs(Math.sin(seed) * 16777215)) % 16777215);
    color = color.toString(16);
    // pad any colors shorter than 6 characters with leading 0s
    while(color.length < 6) {
        color = '0' + color;
    }
    
    return color;
}


function groupCourses(courses)
{
	var groups = new Array();
	var sorted = courses.sort(sortDayTime);
	var sorted = courses.sort(sortHour);
	
	
	
//	var db = document.getElementById('debugg_view');
//	for( var i = 0; i<sorted.length; i++)
//	{
//		db.innerHTML += sorted[i].startTime + "<br>";
//	}
//	console.log(sorted.length);
	
	
	
	for( var i = 0; i < courses.length-1; i++)
	{
		var overlaping = new Array();
		groups.push(overlaping);
		overlaping.push(courses[i]);
		
		for( var j = (i+1); j < courses.length; j++)
		{
			if( courses[i].startTime === courses[j].startTime )
			{
				if( !isDuplicate(courses[i], courses[j]))
				{
					overlaping.push(courses[j]);
				}
			}	
		}
	}	
	
	return groups;
}

function sortHour(courseA, courseB)
{
	var timestampA = courseA.startTime.split('');
	var hourA = parseInt(timestampA[0] + timestampA[1]);

	var timestampB = courseB.startTime.split('');
	var hourB = parseInt(timestampB[0] + timestampB[1]);
	
	if( hourA > hourB )
	{
		return 1;
	}
	if( hourA < hourB )
	{
		return -1;
	}
	
	return 0;
}

function sortDayTime(courseA, courseB)
{
	var hourA = courseA.startTime.split('');
	var dayTimeA = hourA[6] + hourA[7];

	var hourB = courseB.startTime.split('');
	var dayTimeB = hourB[6] + hourB[7];
	
	if( dayTimeA > dayTimeB )
	{
		return 1;
	}
	if( dayTimeA < dayTimeB )
	{
		return -1;
	}
	
	return 0;
}

function isDuplicate(courseA, courseB)
{
	if( courseA.crn === courseB.crn )
	{
		return true;
	}
	else
	{
		return false;
	}
}
