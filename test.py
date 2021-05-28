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


def getAllDatesList(filename):
	dateFile = open(filename, "r")

	dateFileContents = dateFile.read()
	allDatesList = ast.literal_eval(dateFileContents)

	dateFile.close()
	return allDatesList


def switchMaintenanceMode(command):
	if command == "off" and path.exists('htcaccess.on'):
		os.rename('htcaccess.on','htcaccess.off')
		#TODO: send email saying maintenance mode has been enabled
	elif command == "on" and path.exists('htcaccess.off'):
		os.rename('htcaccess.off','htcaccess.on')
		#TODO: send email saying maintenance mode has been disabled


def compareDates(todayDateTimeList, allDatesList):
	startList, endList = [], []
	for dateList in allDatesList:
		startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']] 
		endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']]

		#check to see if today/current time lines up with the dates/times in the list
		if todayList == startList: 
			switchMaintenaceMode("on")
		elif todayList == endList:
			switchMaintenanceMode("off")
	


todayDateTimeList = getCurrentDateTimeList()
allDatesList = getAllDatesList("allTimes.txt")
compareDates(todayDateTimeList, allDatesList)
