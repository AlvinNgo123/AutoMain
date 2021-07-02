function getCurrentDateTimeList() {
	let currentDateTime = new Date();

	let currentMonth = currentDateTime.getMonth()+1;
	let currentDay = currentDateTime.getDate();
	let currentYear = currentDateTime.getFullYear();
	let currentHour = currentDateTime.getHours();
	let currentMins = currentDateTime.getMinutes();
	

	return [currentMonth, currentDay, currentYear, currentHour, currentMins];
}

var currentDateTimeList = getCurrentDateTimeList();
const fs = require("fs");
let dateStr = String(currentDateTimeList[0]).padStart(2, '0') + "/" + String(currentDateTimeList[1]).padStart(2, '0') + "/" + String(currentDateTimeList[2]).padStart(4, '20');
let timeStr = String(currentDateTimeList[3]).padStart(2, '0') + ":" + String(currentDateTimeList[4]).padStart(2, '0');
let dateTimeStr = dateStr + " " + timeStr;

let runMsg = dateTimeStr + " - Cron Scheduler was ran\n";
fs.appendFile("/var/www/html/forms/autoMaintLog.txt", runMsg, (err) => {
	if (err) throw err;
});