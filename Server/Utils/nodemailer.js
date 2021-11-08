const nodemailer = require('nodemailer');

const sendEmail = (to, sub, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amishra0807@gmail.com',
      pass: 'nwhorsgfuetrsoqc'
    }
  });
  
  var mailOptions = {
    from: 'amishra0807@gmail.com',
    to: to,
    subject: sub,
    text: text
  };

  

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

module.exports = sendEmail

