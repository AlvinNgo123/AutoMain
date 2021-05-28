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
    		switchMaintenaceMode("on");
    	} else if (currentDateTimeList == endList) {
    		switchMaintenaceMode("off");
    	} 
	}
}


/*def compareDates(todayDateTimeList, allDatesList):
	startList, endList = [], []
	for dateList in allDatesList:
		startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']] 
		endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']]

	#check to see if today/current time lines up with the dates/times in the list
	if todayList == startList: 
		switchMaintenaceMode("on")
	elif todayList == endList:
		switchMaintenanceMode("off")*/


var currentDateTimeList = getCurrentDateTimeList();

var fs = require("fs");
fs.readFile("allTimes.txt", function(error, text) {
	allDatesList = JSON.parse(text);
	testCompare(currentDateTimeList, allDatesList);
	//console.log(allDatesList);
	//return allDatesList; 
});




