import smtplib

sender = 'es-records@csulb.edu'
receivers = ['Alvin.Ngo@csulb.edu']

message = """From: es-records <es-records@csulb.edu>
To: Alvin <Alvin.Ngo@csulb.edu>
Subject: SMTP e-mail test

This is a test e-mail message.
"""

try:
   smtpObj = smtplib.SMTP('localhost')
   smtpObj.sendmail(sender, receivers, message)         
   print "Successfully sent email"
except smtplib.SMTPException:
   print "Error: unable to send email"