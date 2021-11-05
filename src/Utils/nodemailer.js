const nodemailer = require('nodemailer');

export default function(to, sub, text, cb){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'meenadeepak42548@gmail.com',
      pass: 'hqyqhmwuaposyqlk'
    }
  });
  
  var mailOptions = {
    from: 'meenadeepak42548@gmail.com',
    to: to,
    subject: sub,
    text: text
  };

  

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      cb(error,null);
    } else {
      console.log('Email sent: ' + info.response);
      cb(null, info.response);
    }
  });

}

// vks('LCS2019065@iiitl.ac.in', 'NODEMAILER', 'Bro nodemailer work kar rha ', function(err, res){
//   if(err){
//     console.log('fail');
//     console.log(err);
//   }
//   else{
//     console.log('pass');
//     console.log(res);
//   }
// })

