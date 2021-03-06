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

function sendTeamEmail(command) {
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: '',
		pass: ''
	}
	});

	var mailOptions = {};
	if (command == "on"){
		mailOptions = {
			from: 'ngoalvin123@gmail.com',
			to: 'ngoalvin@rocketmail.com',
			subject: 'Eform Maintenance Mode is ONNN',
			text: 'M mode was just turned on On. - A'
		};
	} else {
		mailOptions = {
			from: 'ngoalvin123@gmail.com',
			to: 'ngoalvin@rocketmail.com',
			subject: 'Eform Maintenance Mode if OFFF',
			text: 'M mode was just turned on Off. - A'
		};
	}
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

function switchMaintenanceMode(command){
	const fs = require('fs');

	if ((command == 'on') && (fs.existsSync('htcaccess.off'))) {
		fs.rename('htcaccess.off', 'htcaccess.on', () => {console.log("Turned ON maintenance mode")});
		sendTeamEmail(command);
	} else if ((command == 'off') && (fs.existsSync('htcaccess.on'))) {
		fs.rename('htcaccess.on', 'htcaccess.off', () => {console.log("Turned OFF maintenance mode")});
		sendTeamEmail(command);
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
    		switchMaintenanceMode('on');
    		break;
    	} else if ((currList[0]==endList[0]) && (currList[1]==endList[1]) && (currList[2]==endList[2]) && (currList[3]==endList[3]) && (currList[4]==endList[4])) {
    		switchMaintenanceMode('off');
    		break;
    	} 
	}
}

var currentDateTimeList = getCurrentDateTimeList();
const fs = require("fs");
fs.readFile("allTimes.txt", function(error, text) {
	allDatesList = JSON.parse(text);
	testCompare(currentDateTimeList, allDatesList);
});




