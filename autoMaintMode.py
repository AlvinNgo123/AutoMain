# !/usr/bin/python
import os, sys
import os.path
from os import path
from datetime import datetime
import ast

def getCurrentDateTimeList():
	currentDateTime = datetime.now()
	currDTstring = currentDateTime.strftime("%d/%m/%Y/%H/%M/%S")
	print(currDTstring)
	currDTlist = currDTstring.split('/')

	currMonth = currDTlist[1]
	currDay = currDTlist[0]
	currYear = currDTlist[2]

	currHour = currDTlist[3]
	currMinute = currDTlist[4]
	todayList = [currMonth, currDay, currYear, currHour, currMinute]
	return todayList

def logProgramRunning(todayDateTimeList):
	fileLog = open("autoMaintLog.txt", "a")
	#
	dateLogLine = todayDateTimeList[0] + "/" + todayDateTimeList[1] + "/" + todayDateTimeList[2] 
	timeLogLine = todayDateTimeList[3] + ":" + todayDateTimeList[4]  

	fileLog.write(dateLogLine + " " + timeLogLine + " - Cron Scheduler was ran\n")
	fileLog.close()

todayDateTimeList = getCurrentDateTimeList()
logProgramRunning(todayDateTimeList)
print(todayDateTimeList)