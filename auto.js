console.log("js is working")

function getCurrentDateTimeList() {
	var currentDateTime = new Date();

	var currentMonth = currentDateTime.getMonth()+1;
	var currentDay = currentDateTime.getDate();
	var currentYear = currentDateTime.getFullYear();
	var currentHour = currentDateTime.getHours();
	var currentMins = currentDateTime.getMinutes();

	return [currentMonth, currentDay, currentYear, currentHour, currentMins];
}

function testCompare(currentDateTimeList, allDatesList){
	var startList = [];
	var endList = [];

	for (const dateList of allDatesList) {
    	startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']];
    	endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']];
	
    	if (currentDateTimeList == startList) {
    		switchMaintenaceMode('on');
    	} else if (currentDateTimeList == endList) {
    		switchMaintenaceMode('off');
    	} 
	}
}

function switchMaintenaceMode(command){
	const fs = require('fs');

	if ((command == 'on') && (fs.existsSync('htcaccess.off'))) {
		fs.rename('htcaccess.off', 'htcaccess.on', () => {console.log("Turned ON maintenance mode")});
	} else if ((command == 'off') && (fs.existsSync('htcaccess.on'))) {
		fs.rename('htcaccess.on', 'htcaccess.off', () => {console.log("Turned OFF maintenance mode")});
	}
}


var currentDateTimeList = getCurrentDateTimeList();

const fs = require("fs");
fs.readFile("allTimes.txt", function(error, text) {
	allDatesList = JSON.parse(text);
	testCompare(currentDateTimeList, allDatesList);
});




