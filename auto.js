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

function switchMaintenaceMode(command){
	const fs = require('fs');

	if ((command == 'on') && (fs.existsSync('htcaccess.off'))) {
		fs.rename('htcaccess.off', 'htcaccess.on', () => {console.log("Turned ON maintenance mode")});
	} else if ((command == 'off') && (fs.existsSync('htcaccess.on'))) {
		fs.rename('htcaccess.on', 'htcaccess.off', () => {console.log("Turned OFF maintenance mode")});
	}
}

function testCompare(currentDateTimeList, allDatesList){
	var currList = currentDateTimeList;
	var startList = [];
	var endList = [];

	for (const dateList of allDatesList) {
    	startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']];
    	endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']];

    	if ((currList[0]==startList[0]) && (currList[1]==startList[1]) && (currList[2]==startList[2]) && (currList[3]==startList[3]) && (currList[4]==startList[4])) {
    		switchMaintenaceMode('on');
    		break;
    	} else if ((currList[0]==endList[0]) && (currList[1]==endList[1]) && (currList[2]==endList[2]) && (currList[3]==endList[3]) && (currList[4]==endList[4])) {
    		switchMaintenaceMode('off');
    		break;
    	} 
	}
}

var currentDateTimeList = getCurrentDateTimeList();
const fs = require("fs");
fs.readFile("allTimes.txt", function(error, text) {
	allDatesList = JSON.parse(text);
	testCompare(currentDateTimeList, allDatesList);

	//debug
	/*currList = currentDateTimeList;
	dateList = allDatesList[0];
	testList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']];
	
	if ( (currList[0]==testList[0]) && (currList[1]==testList[1]) && (currList[2]==testList[2]) && (currList[3]==testList[3]) && (currList[4]==testList[4]) ){
		console.log(currList);
		console.log(testList);
		console.log('YES');
	}else {
		console.log(currList);
		console.log(testList);
		console.log("NOPE");
	}*/
});




