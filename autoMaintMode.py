# !/usr/bin/python
import os, sys
import os.path
from os import path
from datetime import datetime
import ast

def getCurrentDateTimeList():
	currentDateTime = datetime.now()
	currDTstring = currentDateTime.strftime("%d/%m/%Y/%H/%M/%S")
	currDTlist = currDTstring.split('/')

	currMonth = currDTlist[1]
	currDay = currDTlist[0]
	currYear = currDTlist[2]

	currHour = currDTlist[3]
	currMinute = currDTlist[4]
	todayList = [currMonth, currDay, currYear, currHour, currMinute]
	return todayList


def logProgramStatus(todayDateTimeList, command):
	#fileLog = open("autoMaintLog.txt", "a")
	fileLog = open("/var/www/html/admin/autoMaintLog.txt", "a") 
	dateLogLine = todayDateTimeList[0] + "/" + todayDateTimeList[1] + "/" + todayDateTimeList[2] 
	timeLogLine = todayDateTimeList[3] + ":" + todayDateTimeList[4]  

	if command == 'run':
		fileLog.write(dateLogLine + " " + timeLogLine + " - Cron Scheduler was ran\n")
	elif command == 'on':
		fileLog.write(dateLogLine + " " + timeLogLine + " - Cron turned ON maintenance mode\n")
	elif command == 'off':
		fileLog.write(dateLogLine + " " + timeLogLine + " - Cron turned OFF maintenance mode\n")
	fileLog.close()


def getAllDatesList(filename):
	dateFile = open(filename, "r")

	dateFileContents = dateFile.read()
	allDatesList = ast.literal_eval(dateFileContents)

	dateFile.close()
	return allDatesList


def switchMaintenanceMode(command, todayDateTimeList):
	if command == "off" and path.exists('/var/www/html/forms/.htaccess'):
	#if command == "off" and path.exists('.htaccess'):
		os.rename('/var/www/html/forms/.htaccess','/var/www/html/forms/.htaccess.off')
		#os.rename('.htaccess','.htaccess.off')
		logProgramStatus(todayDateTimeList, command)
		#TODO: send email saying maintenance mode has been enabled
	elif command == "on" and path.exists('/var/www/html/forms/.htaccess.off'):
	#elif command == "on" and path.exists('.htaccess.off'):	
		os.rename('/var/www/html/forms/.htaccess.off','/var/www/html/forms/.htaccess')
		#os.rename('.htaccess.off','.htaccess')
		logProgramStatus(todayDateTimeList, command)
		#TODO: send email saying maintenance mode has been disabled


def compareDates(todayDateTimeList, allDatesList):
	startList, endList = [], []
	for dateList in allDatesList:
		startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']] 
		endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']]

		#check to see if today/current time lines up with the dates/times in the list
		if todayDateTimeList == startList: 
			switchMaintenanceMode("on", todayDateTimeList)
		elif todayDateTimeList == endList:
			switchMaintenanceMode("off", todayDateTimeList)


todayDateTimeList = getCurrentDateTimeList()
logProgramStatus(todayDateTimeList, "run")
#allDatesList = getAllDatesList("allAutoTimes.txt")
allDatesList = getAllDatesList("/var/www/html/admin/allAutoTimes.txt")
compareDates(todayDateTimeList, allDatesList)
