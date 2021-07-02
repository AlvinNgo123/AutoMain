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

def logProgramRunning(todayDateTimeList):
	fileLog = open("autoMaintLog.txt", "a")
	#fileLog = open("/var/www/html/admin/autoMaintLog.txt", "a") 
	dateLogLine = todayDateTimeList[0] + "/" + todayDateTimeList[1] + "/" + todayDateTimeList[2] 
	timeLogLine = todayDateTimeList[3] + ":" + todayDateTimeList[4]  

	fileLog.write(dateLogLine + " " + timeLogLine + " - Cron Scheduler was ran\n")
	fileLog.close()

def getAllDatesList(filename):
	dateFile = open(filename, "r")

	dateFileContents = dateFile.read()
	allDatesList = ast.literal_eval(dateFileContents)

	dateFile.close()
	return allDatesList

def switchMaintenanceMode(command):
	'''if command == "off" and path.exists('htcaccess.on'):
		os.rename('htcaccess.on','htcaccess.off')
		#TODO: send email saying maintenance mode has been enabled
	elif command == "on" and path.exists('htcaccess.off'):
		os.rename('htcaccess.off','htcaccess.on')
		#TODO: send email saying maintenance mode has been disabled'''

	if command == "off" and path.exists('.htcaccess'):
		os.rename('.htcaccess','.htcaccess.off')
		#TODO: send email saying maintenance mode has been enabled
	elif command == "on" and path.exists('.htcaccess.off'):
		os.rename('.htcaccess.off','.htcaccess')
		#TODO: send email saying maintenance mode has been disabled

def compareDates(todayDateTimeList, allDatesList):
	startList, endList = [], []
	for dateList in allDatesList:
		startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']] 
		endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']]

		#check to see if today/current time lines up with the dates/times in the list
		if todayDateTimeList == startList: 
			switchMaintenaceMode("on")
			print("here")
		elif todayDateTimeList == endList:
			switchMaintenanceMode("off")
			print("there")

todayDateTimeList = getCurrentDateTimeList()
logProgramRunning(todayDateTimeList)
allDatesList = getAllDatesList("allAutoTimes.txt")
#allDatesList = getAllDatesList("/var/www/html/admin/allAutoTimes.txt")
compareDates(todayDateTimeList, allDatesList)
