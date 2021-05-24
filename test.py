# !/usr/bin/python
import os, sys
import os.path
from os import path
from datetime import datetime
import ast

# listing directories
#print ("The dir is: %s"%os.listdir(os.getcwd()))

#get current date and store in separate variables
currentDateTime = datetime.now()
currDTstring = currentDateTime.strftime("%d/%m/%Y/%H/%M/%S")
currDTlist = currDTstring.split('/')
#print(currDTlist)

currMonth = currDTlist[1]
currDay = currDTlist[0]
currYear = currDTlist[2]

currHour = currDTlist[3]
currMinute = currDTlist[4]
todayList = [currMonth, currDay, currYear, currHour, currMinute]
#print(today)

#grab list from an external txt file
allTimesFile = open("allTimes.txt", "r")
contents = allTimesFile.read()
thisContentList = ast.literal_eval(contents)

allTimesFile.close()
#print(type(thisContentList))
#print(thisContentList)

#Go through each datetime in the list
#Compare the two time dates (todaylist & each one in list)
for dateList in thisContentList:
	startList = [dateList['startMonth'], dateList['startDay'], dateList['startYear'], dateList['startHour'], dateList['startMinute']] 
	endList = [dateList['endMonth'], dateList['endDay'], dateList['endYear'], dateList['endHour'], dateList['endMinute']]



#test rename
if path.exists('nameSuccess1.txt'):
    os.rename('nameSuccess1.txt','nameSuccess2.txt')
elif path.exists('nameSuccess2.txt'):
    os.rename('nameSuccess2.txt','nameSuccess1.txt')


#reprint
#print ("The dir is: %s"%os.listdir(os.getcwd()))