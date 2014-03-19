/**
 * 
 */
function drawOnCanvas()
{
	var ttCanvas= document.getElementById('time_table');
	var ttContext = ttCanvas.getContext('2d');
	
	for( var i = 0; i<8; i++)
	{
		drawHourBox(ttCanvas, i, 10);
	}	
	
	drawHour(ttCanvas, 0, 10, 45);
	drawDaysOfWeek(ttCanvas, 10, 125);
}

function printEventInTable(eventData, tableDim, stage)
{
	var coordX = getTotalHorizontalCoord(eventData.day, tableDim.boxWidth, tableDim.margin, eventData.elementInPosition, eventData.eleOnSameHorizontal);
	var coordY = getTotalVerticalCoord(eventData.time, tableDim.boxHeight, tableDim.margin);
	
	var newBoxWidth = tableDim.boxWidth / (eventData.eleOnSameHorizontal);
	
	drawWithKinetic(coordX, coordY, newBoxWidth, eventData.fillcol, stage);
}

function drawHourBox(canvas, position, margin)
{
	var context = canvas.getContext('2d');
	//context.translate(0.5,0.5);	// use this option to have crisp lines
	
	var boxHeight = 45;
	var boxWidth = canvas.clientWidth - (margin * 2);
	var startX = margin;
	var startY = margin + (boxHeight * position) + 15;
		
	context.beginPath();
	context.lineWidth = '1px';
	context.lineStyle = 'black';
	context.setLineDash([0]);
	context.rect(startX, startY, boxWidth, boxHeight);
	context.stroke();
	context.closePath();
	
	var firstColumnWidth = 70;
	
	context.beginPath();
	context.moveTo(margin + firstColumnWidth, startY);
	context.lineTo(margin + firstColumnWidth, boxHeight + startY);
	context.stroke();
	context.closePath();
	
	drawDashedLines(canvas, position, margin, firstColumnWidth);
	drawHour(canvas, position, margin, boxHeight);
}

function drawDashedLines(canvas, position, margin, firstColumnWidth)
{
	var context = canvas.getContext('2d');
	
	var boxHeight = 45;
	var boxWidth = canvas.clientWidth - (margin * 2);
	var dashedLineY = margin + (boxHeight * position) + (boxHeight / 2) + 15;
	
	context.beginPath();
	context.setLineDash([3]);
	context.moveTo(margin + firstColumnWidth, dashedLineY);
	context.lineTo(margin + boxWidth, dashedLineY);
	context.stroke();
	context.closePath();
}

function drawHour(canvas, position, margin, boxHeight)
{
	var context = canvas.getContext('2d');
	
	var startX = margin + 2;
	var startY = margin + 12 + (boxHeight * position) + 15;
	
	context.font = 'italic 10pt Consolas';
    context.fillText(getHourByPosition(position), startX, startY);
}

function drawDaysOfWeek(canvas, margin, boxWidth)
{
	var context = canvas.getContext('2d');
	var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	
	var baseX = margin + 70;
	var coordY = margin + 12;
	
	context.font = 'italic 10pt Consolas';
	
	for( var i = 0; i < days.length; i++)
	{
		var coodrX = baseX + (boxWidth * i-1);
		context.fillText(days[i], coodrX, coordY);
	}  
}

function getTotalVerticalCoord(hour, boxHeight, margin)
{
	var tokHour = hour.split('');
	var digitsHour = tokHour[0] + tokHour[1];
	var digitsMinute = parseInt(tokHour[3] + tokHour[4]);
	var dayTime = tokHour[6] + tokHour[7];
	
	var position = getPositionByHour(digitsHour, dayTime);
	var minutesOffset = (boxHeight / 60) * digitsMinute;
	var totalVerticalPosition = margin + boxHeight * position + minutesOffset + 15;
	
	return totalVerticalPosition;
}

/**
 * Multiple boxes can be placed on the same horizontal, if so the box must be
 * shrunk and next box must appear next to the previous one instead of 
 * overlapping each other.
 * @param day
 * @param boxWidth
 * @param margin
 * @param elementsInPosition position of element within one day on the schedule.
 */
function getTotalHorizontalCoord(day, boxWidth, margin, elementInPosition, eleOnSameHorizontal)
{
	var totalHorizontalCoord = 0;
	var dayOffset = 0;
	
	if( day === 'M' )
	{
		// no shift due to a day
	}
	if( day === 'T' )
	{
		dayOffset = boxWidth * 1;
	}
	if( day === 'W' )
	{
		dayOffset = boxWidth * 2;
	}
	if( day === 'R' )
	{
		dayOffset = boxWidth * 3;
	}
	if( day === 'F' )
	{
		dayOffset = boxWidth * 4;
	}
	if( day === 'S' )
	{
		dayOffset = boxWidth * 5;
	}
	if( day === 'U' )
	{
		dayOffset = boxWidth * 6;
	}
	
	var multBoxOffset = (boxWidth / eleOnSameHorizontal) * elementInPosition;
	totalHorizontalCoord = margin + 70 + dayOffset + multBoxOffset;
	
	return totalHorizontalCoord;
}

function getHourByPosition(position)
{
	if( position == 0 || position == 12)
	{
		return '08:00';
	}
	if( position == 1 || position == 13)
	{
		return '09:00';
	}
	if( position == 2 || position == 14)
	{
		return '10:00';
	}
	if( position == 3 || position == 15)
	{
		return '11:00';
	}
	if( position == 4 || position == 16)
	{
		return '12:00';
	}
	if( position == 5 || position == 17)
	{
		return '01:00';
	}
	if( position == 6 || position == 18)
	{
		return '02:00';
	}
	if( position == 7 || position == 19)
	{
		return '03:00';
	}
	if( position == 8 || position == 20)
	{
		return '04:00';
	}
	if( position == 9 || position == 21)
	{
		return '05:00';
	}
	if( position == 10 || position == 22)
	{
		return '06:00';
	}
	if( position == 11 || position == 23)
	{
		return '07:00';
	}
}

function getPositionByHour(hour, dayTime)
{
	if( hour == '08' && dayTime == 'AM' )
	{
		return 0;
	}
	if( hour == '09' && dayTime == 'AM' )
	{
		return 1;
	}
	if( hour == '10' && dayTime == 'AM' )
	{
		return 2;
	}
	if( hour == '11' && dayTime == 'AM' )
	{
		return 3;
	}
	if( hour == '12' && dayTime == 'PM' )
	{
		return 4;
	}
	if( hour == '01' && dayTime == 'PM' )
	{
		return 5;
	}
	if( hour == '02' && dayTime == 'PM' )
	{
		return 6;
	}
	if( hour == '03' && dayTime == 'PM' )
	{
		return 7;
	}
	if( hour == '04' && dayTime == 'PM' )
	{
		return 8;
	}
	if( hour == '05' && dayTime == 'PM' )
	{
		return 9;
	}
	if( hour == '06' && dayTime == 'PM' )
	{
		return 10;
	}
	if( hour == '07' && dayTime == 'PM' )
	{
		return 11;
	}
	if( hour == '08' && dayTime == 'PM' )
	{
		return 12;
	}
	if( hour == '09' && dayTime == 'PM' )
	{
		return 13;
	}
	if( hour == '10' && dayTime == 'PM' )
	{
		return 14;
	}
	if( hour == '11' && dayTime == 'PM' )
	{
		return 15;
	}
	if( hour == '12' && dayTime == 'AM' )
	{
		return 16;
	}
	if( hour == '01' && dayTime == 'AM' )
	{
		return 17;
	}
	if( hour == '02' && dayTime == 'AM' )
	{
		return 18;
	}
	if( hour == '03' && dayTime == 'AM' )
	{
		return 19;
	}
	if( hour == '04' && dayTime == 'AM' )
	{
		return 20;
	}
	if( hour == '05' && dayTime == 'AM' )
	{
		return 21;
	}
	if( hour == '06' && dayTime == 'AM' )
	{
		return 22;
	}
	if( hour == '07' && dayTime == 'AM' )
	{
		return 23;
	}
}









