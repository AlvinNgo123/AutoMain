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


def switchMainMode(command):
	if command == "off" and path.exists('htcaccess.on'):
		os.rename('htcaccess.on','htcaccess.off')
	elif command == "on" and path.exists('htcaccess.off'):
		os.rename('htcaccess.off','htcaccess.on')


def getAllDatesList(filename):
	dateFile = open(filename, "r")

	dateFileContents = dateFile.read()
	allDatesList = ast.literal_eval(dateFileContents)

	dateFile.close()
	return allDatesList



# listing directories
#print ("The dir is: %s"%os.listdir(os.getcwd()))

todayDateTimeList = getCurrentDateTimeList()

#grab list from an external txt file
allDatesList = getAllDatesList("allTimes.txt")
print(allDatesList)

#Go through each datetime in the list
#Compare the two time dates (todaylist & each one in list)
for dateList in allDatesList:
	startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']] 
	endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']]

	#do comparison with todayList
	if todayList == startList:
		#Turn on maintenace mode by first checking if mode is currently off & then renaming file  
		switchMainMode("on")
	elif todayList == endList:
		#Turn off maintenance mode by first checking if mode is currently on & then renaming file
		switchMainMode("off")







#reprint
#print ("The dir is: %s"%os.listdir(os.getcwd()))