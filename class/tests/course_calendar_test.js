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








