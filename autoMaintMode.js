console.log("js is working")

function getCurrentDateTimeList() {
	let currentDateTime = new Date();

	let currentMonthStr = String(currentDateTime.getMonth()+1);
	let currentMonth = currentMonthStr.padStart(2, '0');
	let currentDayStr = String(currentDateTime.getDate());
	let currentDay = currentDayStr.padStart(2, '0');
	let currentYearStr = String(currentDateTime.getFullYear());
	let currentYear = currentYearStr.padStart(4, '20');

	let currentHourStr = String(currentDateTime.getHours());
	let currentHour = currentHourStr.padStart(2, '0');
	let currentMinsStr = String(currentDateTime.getMinutes());
	let currentMins = currentMinsStr.padStart(2, '0');
	

	return [currentMonth, currentDay, currentYear, currentHour, currentMins];
}

function switchMaintenanceMode(command, timeList){
	const fs = require('fs');
	let dateStr = String(timeList[0]) + "/" + String(timeList[1]) + "/" + String(timeList[2]);
	let timeStr = String(timeList[3]) + ":" + String(timeList[4]);
	let dateTimeStr = dateStr + " " + timeStr;

	if ((command == 'on') && (fs.existsSync('htcaccess.off'))) {
		fs.rename('htcaccess.off', 'htcaccess.on', () => {
			let turnOnMsg = dateTimeStr + " - Turned ON maintenance mode\n";
			console.log(turnOnMsg);
			fs.appendFile("autoMaintLog.txt", turnOnMsg, (err) => {
				if (err) throw err;
			});
		});
	} else if ((command == 'off') && (fs.existsSync('htcaccess.on'))) {
		fs.rename('htcaccess.on', 'htcaccess.off', () => {
			let turnOffMsg = dateTimeStr + " - Turned OFF maintenance mode\n";
			console.log(turnOffMsg);
			fs.appendFile("autoMaintLog.txt", turnOffMsg, (err) => {
				if (err) throw err;
			});
		});
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
    		switchMaintenanceMode('on', startList);
    		break;
    	} else if ((currList[0]==endList[0]) && (currList[1]==endList[1]) && (currList[2]==endList[2]) && (currList[3]==endList[3]) && (currList[4]==endList[4])) {
    		switchMaintenanceMode('off', endList);
    		break;
    	} 
	}
}

var currentDateTimeList = getCurrentDateTimeList();
const fs = require("fs");
fs.readFile("allAutoTimes.txt", function(error, text) {
	allDatesList = JSON.parse(text);
	testCompare(currentDateTimeList, allDatesList);
});




