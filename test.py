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
testList = [currDay, currMonth, currYear, currHour, currMinute]
#print(testList)

#grab list from an external txt file
allTimesFile = open("allTimes.txt", "r")
contents = allTimesFile.read()
thisContent = ast.literal_eval(contents)

allTimesFile.close()
#print(type(thisContent))
#print(thisContent)

#Go through each datetime in the list
#Compare the two time dates (current & each one in list)




#test rename
if path.exists('nameSuccess1.txt'):
    os.rename('nameSuccess1.txt','nameSuccess2.txt')
elif path.exists('nameSuccess2.txt'):
    os.rename('nameSuccess2.txt','nameSuccess1.txt')


#reprint
#print ("The dir is: %s"%os.listdir(os.getcwd()))