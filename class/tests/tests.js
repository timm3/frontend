
test( "courseToEventData test1", function() 
{
	var testData = {code: "MATH", subject: "Calc III", crn: "10145", startTime: '01:00 PM', endTime: '02:30 PM', days: 'MWF '};
	var seed = 0;
	var eventData =	courseToEventData(testData, seed);

	var expectedResult0 = {time: '01:00 PM', day: 'M', elementInPosition: 0, eleOnSameHorizontal: 1, fillcol: '#000000'};
	var expectedResult1 = {time: '01:00 PM', day: 'W', elementInPosition: 0, eleOnSameHorizontal: 1, fillcol: '#000000'};
	var expectedResult2 = {time: '01:00 PM', day: 'F', elementInPosition: 0, eleOnSameHorizontal: 1, fillcol: '#000000'};
	
	deepEqual(expectedResult0, eventData[0], "eventData[0].day is equal to day 'M'");
	deepEqual(expectedResult1, eventData[1], "eventData[0].day is equal to day 'W'");
	deepEqual(expectedResult2, eventData[2], "eventData[0].day is equal to day 'R'");
});

test( "courseToEventData test2", function() 
{
	var testData = {code: "MATH", subject: "Linear Algebra", crn: "55555", startTime: '03:00 PM', endTime: '03:50 PM', days: 'T R'};
	var seed = 0;
	var eventData =	courseToEventData(testData, seed);
	
	var expectedResult0 = {time: '03:00 PM', day: 'T', elementInPosition: 0, eleOnSameHorizontal: 1, fillcol: '#000000'};
	var expectedResult1 = {time: '03:00 PM', day: 'R', elementInPosition: 0, eleOnSameHorizontal: 1, fillcol: '#000000'};
	
	deepEqual(expectedResult0, eventData[0], "eventData[0].day is equal to day 'T'");
	deepEqual(expectedResult1, eventData[1], "eventData[0].day is equal to day 'R'");
});

test( "getTotalVerticalCoord test1", function()
{
	var hour = '01:00 AM';
	var boxHeight = 45;
	var margin = 10;
	var verticalCoordinate = getTotalVerticalCoord(hour, boxHeight, margin);
	
	var expectedResult = 790;
	equal(expectedResult, verticalCoordinate, "Received 'verticalCoordinate' is equal to the expected value '790'");
});

test( "getTotalVerticalCoord test2", function()
{
	var hour = '10:00 PM';
	var boxHeight = 30;
	var margin = 0;
	var verticalCoordinate = getTotalVerticalCoord(hour, boxHeight, margin);
	
	var expectedResult = 435;
	equal(expectedResult, verticalCoordinate, "Received 'verticalCoordinate' is equal to the expected value '435'");
});

test( "getTotalVerticalCoord test3", function()
{
	var hour = '10:00 PM';
	var boxHeight = 0;
	var margin = 0;
	var verticalCoordinate = getTotalVerticalCoord(hour, boxHeight, margin);
	
	var expectedResult = 15	;
	equal(expectedResult, verticalCoordinate, "Received 'verticalCoordinate' is equal to the expected value '15'");
});


test( "getTotalHorizontalCoord test1", function() 
{
	var day = "M";
	var boxWidth = 100;
	var margin = 10;
	var elementInPosition = 0;
	var eleOnSameHorizontal = 1;
	
	var horizontalCoordinate = getTotalHorizontalCoord(day, boxWidth, margin, elementInPosition, eleOnSameHorizontal);
	
	var expectedResult = 80;
	equal(expectedResult, horizontalCoordinate, "Received 'horizontalCoordinate' for Monday is equal to the expected value '80'");
});

test( "getTotalHorizontalCoord test1", function() 
{
	var day = "T";
	var boxWidth = 100;
	var margin = 10;
	var elementInPosition = 0;
	var eleOnSameHorizontal = 1;
	
	var horizontalCoordinate = getTotalHorizontalCoord(day, boxWidth, margin, elementInPosition, eleOnSameHorizontal);
	
	var expectedResult = 180;
	equal(expectedResult, horizontalCoordinate, "Received 'horizontalCoordinate' for Tuesday is equal to the expected value '180'");
});

test( "getTotalHorizontalCoord test1", function() 
{
	var day = "W";
	var boxWidth = 100;
	var margin = 10;
	var elementInPosition = 0;
	var eleOnSameHorizontal = 1;
	
	var horizontalCoordinate = getTotalHorizontalCoord(day, boxWidth, margin, elementInPosition, eleOnSameHorizontal);
	
	var expectedResult = 280;
	equal(expectedResult, horizontalCoordinate, "Received 'horizontalCoordinate' for Wednesday is equal to the expected value '280'");
});




