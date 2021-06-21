var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'bulkmail.its.csulb.edu ',
  port: 465,
  secure: true
  /*auth: {
    user: '',
    pass: ''
  }*/
});

var mailOptions = {
  from: 'es-records@csulb.edu',
  to: 'ngoalvin@rocketmail.com',
  subject: 'Sending NEW Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});