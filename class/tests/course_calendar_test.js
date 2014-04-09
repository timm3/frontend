/******************************************************************************
 * 	yCoordFromHour()
 ******************************************************************************/
test( "yCoordFromHour test : time on the edge of prohibited range. In prohibited range.", function() 
{
	var time = '12:00 AM';
	var expectedCoordinate = -1;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course in prohibited time range [12:00 AM, 7:59 AM]. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of prohibited range. In prohibited range.", function() 
{
	var time = '07:59 AM';
	var expectedCoordinate = -1;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course in prohibited time range [12:00 AM, 7:59 AM]. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of prohibited range. Outside of prohibited range.", function() 
{
	var time = '08:00 AM';
	var expectedCoordinate = 0;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course in prohibited time range [12:00 AM, 7:59 AM]. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of prohibited range. Outside of prohibited range.", function() 
{
	var time = '11:59 PM';
	var expectedCoordinate = 479.5;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course in prohibited time range [12:00 AM, 7:59 AM]. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of AM/PM time.", function() 
{
	var time = '11:59 AM';
	var expectedCoordinate = 119.5;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course on the edge of time change from AM to PM. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of AM/PM time.", function() 
{
	var time = '12:00 PM';
	var expectedCoordinate = 120;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course on the edge of time change from AM to PM. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of PM double digit hour to single digit hour.", function() 
{
	var time = '12:59 PM';
	var expectedCoordinate = 149.5;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course on the edge of time change from double digit to single digit. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});

test( "yCoordFromHour test : time on the edge of PM double digit hour to single digit hour.", function() 
{
	var time = '01:00 PM';
	var expectedCoordinate = 150;
	var yCoord = yCoordFromHour(time);
	var message = "yCoordinate for a course on the edge of time change from double digit to single digit. time = '" + time + "' expectedCoordinate = " + expectedCoordinate;
	
	strictEqual(yCoord, expectedCoordinate, message);
});


/******************************************************************************
 * 	isCorrectFormat()
 ******************************************************************************/
test( "isCorrectFormat test : test hour format", function() 
{
	var time = '01:00 PM';
	var expectedResult = true;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = '00:00 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = '00:00 AM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = '12:00 PM';
	var expectedResult = true;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = '13:00 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = '12:00 AM';
	var expectedResult = true;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = '1:00 AM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test hour format", function() 
{
	var time = 'o1:50 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test minute format", function() 
{
	var time = '01:60 AM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test minute format", function() 
{
	var time = '01:5 AM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test minute format", function() 
{
	var time = '01:60 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test minute format", function() 
{
	var time = '01:5 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test minute format", function() 
{
	var time = '01:5o PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test separator format", function() 
{
	var time = '01-00 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test separator format", function() 
{
	var time = '01/00 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test separator format", function() 
{
	var time = '01-00-PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test separator format", function() 
{
	var time = '01/00/PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test separator format", function() 
{
	var time = '01 00 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

test( "isCorrectFormat test : test time with seconds format", function() 
{
	var time = '01:00:00 PM';
	var expectedResult = false;
	var isCorrect = isCorrectFormat(time);
	var message = "Time format of time given with course information. time = '" + time + "' expectedResult = " + expectedResult;
	
	strictEqual(isCorrect, expectedResult, message);
});

/******************************************************************************
 * 	dayTokenToDayTimesId()
 ******************************************************************************/
test( "dayTokenToDayTimesId test : test bad input token.", function() 
{
	var dayToken = ' ';
	var expectedResult = null;
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test bad input token.", function() 
{
	var dayToken = '';
	var expectedResult = null;
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test bad input token.", function() 
{
	var dayToken = null;
	var expectedResult = null;
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'U';
	var expectedResult = 'sunday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'M';
	var expectedResult = 'monday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'T';
	var expectedResult = 'tuesday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'W';
	var expectedResult = 'wednesday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'R';
	var expectedResult = 'thursday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});


test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'F';
	var expectedResult = 'friday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});


test( "dayTokenToDayTimesId test : test returned id of a calendar div for a given day token.", function() 
{
	var dayToken = 'S';
	var expectedResult = 'saturday_times';
	var aDayTimesId = dayTokenToDayTimesId(dayToken);
	var message = "Get id of a div column in calendar where a course is going to be inserted. dayToken = '" + dayToken + "' expectedResult = " + expectedResult;
	
	strictEqual(aDayTimesId, expectedResult, message);
});

/******************************************************************************
 * 	dayTokenStringToDaysTimesIds()
 ******************************************************************************/
test( "dayTokenStringToDaysTimesIds test : test bad input string.", function() 
{
	var daysString = '';
	var expectedResult = [];
	var aDayTimesIds = dayTokenStringToDaysTimesIds(daysString);
	var message = "Get ids of a div columns in calendar where a course is going to be inserted. daysString = '" + daysString + "' expectedResult = []";                                           
	
	deepEqual(aDayTimesIds, expectedResult, message);
});

test( "dayTokenStringToDaysTimesIds test : test bad input string.", function() 
{
	var daysString = '';
	var expectedResult = [];
	var aDayTimesIds = dayTokenStringToDaysTimesIds(daysString);
	var message = "Get ids of a div columns in calendar where a course is going to be inserted. daysString = '" + daysString + "' expectedResult = []";                                           
	
	deepEqual(aDayTimesIds, expectedResult, message);
});

test( "dayTokenStringToDaysTimesIds test : test returned ids of a calendar ddiv'siv for a given string of tokens.", function() 
{
	var daysString = 'MWF';
	var expectedResult = ['monday_times', 'wednesday_times', 'friday_times'];
	var aDayTimesIds = dayTokenStringToDaysTimesIds(daysString);
	var message = "Get ids of a div columns in calendar where a course is going to be inserted. daysString = '" + daysString + "' expectedResult = ['" + expectedResult[0] + "', '" + expectedResult[1] + "', '" + expectedResult[2] + "']";                                           
	
	deepEqual(aDayTimesIds, expectedResult, message);
});

test( "dayTokenStringToDaysTimesIds test : test returned ids of a calendar div's for a given string of tokens.", function() 
{
	var daysString = 'MWF  ';
	var expectedResult = ['monday_times', 'wednesday_times', 'friday_times'];
	var aDayTimesIds = dayTokenStringToDaysTimesIds(daysString);
	var message = "Get ids of a div columns in calendar where a course is going to be inserted. daysString = '" + daysString + "' expectedResult = ['" + expectedResult[0] + "', '" + expectedResult[1] + "', '" + expectedResult[2] + "']";                                           
	
	deepEqual(aDayTimesIds, expectedResult, message);
});

test( "dayTokenStringToDaysTimesIds test : test returned ids of a calendar div's for a given string of tokens.", function() 
{
	var daysString = '  MWF';
	var expectedResult = ['monday_times', 'wednesday_times', 'friday_times'];
	var aDayTimesIds = dayTokenStringToDaysTimesIds(daysString);
	var message = "Get ids of a div columns in calendar where a course is going to be inserted. daysString = '" + daysString + "' expectedResult = ['" + expectedResult[0] + "', '" + expectedResult[1] + "', '" + expectedResult[2] + "']";                                           
	
	deepEqual(aDayTimesIds, expectedResult, message);
});

test( "dayTokenStringToDaysTimesIds test : test returned ids of a calendar div's for a given string of tokens.", function() 
{
	var daysString = 'UMTWRFS';
	var expectedResult = ['sunday_times', 'monday_times', 'tuesday_times', 'wednesday_times', 'thursday_times','friday_times', 'saturday_times'];
	var aDayTimesIds = dayTokenStringToDaysTimesIds(daysString);
	var message = "Get ids of a div columns in calendar where a course is going to be inserted. daysString = '" + daysString + "' expectedResult = ['" + expectedResult[0] + "', '" + expectedResult[1] + "', '" + expectedResult[2] + "', '" + expectedResult[3] + "', '" + expectedResult[4] + "', '" + expectedResult[5] + "', '" + expectedResult[6] + "']";                                           
	
	deepEqual(aDayTimesIds, expectedResult, message);
});

/******************************************************************************
 * 	getCourseBoxHeight()
 ******************************************************************************/
test( "getCourseBoxHeight test : test bad input.", function() 
{
	var startTime = '08:50 AM';
	var endTime = '08:00 AM';
	
	var expectedResult = -1;
	var boxHeight = getCourseBoxHeight(startTime, endTime);
	var message = "Get height of the box representation of a course in calendar. startTime = " + startTime + ", endTime = " + endTime + ", expectedResult = " + boxHeight;                                           
	
	deepEqual(boxHeight, expectedResult, message);
});

test( "getCourseBoxHeight test : test bad input.", function() 
{
	var startTime = '06:50 AM';
	var endTime = '06:00 AM';
	
	var expectedResult = -1;
	var boxHeight = getCourseBoxHeight(startTime, endTime);
	var message = "Get height of the box representation of a course in calendar. startTime = " + startTime + ", endTime = " + endTime + ", expectedResult = " + boxHeight;                                           
	
	deepEqual(boxHeight, expectedResult, message);
});

test( "getCourseBoxHeight test : test width of the course box.", function() 
{
	var startTime = '12:00 AM';
	var endTime = '11:59 PM';
	
	var expectedResult = -1;
	var boxHeight = getCourseBoxHeight(startTime, endTime);
	var message = "Get height of the box representation of a course in calendar. startTime = " + startTime + ", endTime = " + endTime + ", expectedResult = " + boxHeight;                                           
	
	deepEqual(boxHeight, expectedResult, message);
});

test( "getCourseBoxHeight test : test width of the course box.", function() 
{
	var startTime = '08:00 AM';
	var endTime = '08:50 AM';
	
	var expectedResult = 25;
	var boxHeight = getCourseBoxHeight(startTime, endTime);
	var message = "Get height of the box representation of a course in calendar. startTime = " + startTime + ", endTime = " + endTime + ", expectedResult = " + boxHeight;                                           
	
	deepEqual(boxHeight, expectedResult, message);
});

test( "getCourseBoxHeight test : test width of the course box.", function() 
{
	var startTime = '08:00 AM';
	var endTime = '11:59 PM';
	
	var expectedResult = 479.5;
	var boxHeight = getCourseBoxHeight(startTime, endTime);
	var message = "Get height of the box representation of a course in calendar. startTime = " + startTime + ", endTime = " + endTime + ", expectedResult = " + boxHeight;                                           
	
	deepEqual(boxHeight, expectedResult, message);
});









