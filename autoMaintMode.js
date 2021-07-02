function getCurrentDateTimeList() {
	let currentDateTime = new Date();

	let currentMonth = currentDateTime.getMonth()+1;
	let currentDay = currentDateTime.getDate();
	let currentYear = currentDateTime.getFullYear();
	let currentHour = currentDateTime.getHours();
	let currentMins = currentDateTime.getMinutes();
	

	return [currentMonth, currentDay, currentYear, currentHour, currentMins];
}

function switchMaintenanceMode(command, timeList){
	const fs = require('fs');
	let dateStr = String(timeList[0]).padStart(2, '0') + "/" + String(timeList[1]).padStart(2, '0') + "/" + String(timeList[2]).padStart(4, '20');
	let timeStr = String(timeList[3]).padStart(2, '0') + ":" + String(timeList[4]).padStart(2, '0');
	let dateTimeStr = dateStr + " " + timeStr;

	if ((command == 'on') && (fs.existsSync('.htaccess.off'))) {
		fs.rename('.htaccess.off', '.htaccess', () => {
			let turnOnMsg = dateTimeStr + " - Turned ON maintenance mode\n";
			fs.appendFile("autoMaintLog.txt", turnOnMsg, (err) => {
				if (err) throw err;
			});
		});
	} else if ((command == 'off') && (fs.existsSync('.htaccess'))) {
		fs.rename('.htaccess', '.htaccess.off', () => {
			let turnOffMsg = dateTimeStr + " - Turned OFF maintenance mode\n";
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
let dateStr = String(currentDateTimeList[0]).padStart(2, '0') + "/" + String(currentDateTimeList[1]).padStart(2, '0') + "/" + String(currentDateTimeList[2]).padStart(4, '20');
let timeStr = String(currentDateTimeList[3]).padStart(2, '0') + ":" + String(currentDateTimeList[4]).padStart(2, '0');
let dateTimeStr = dateStr + " " + timeStr;

let runMsg = dateTimeStr + " - Cron Scheduler was ran\n";
fs.appendFile("autoMaintLog.txt", runMsg, (err) => {
	if (err) throw err;
});

fs.readFile("allAutoTimes.txt", function(error, text) {
	allDatesList = JSON.parse(text);
	testCompare(currentDateTimeList, allDatesList);
});




