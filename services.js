const nodemailer = require('nodemailer');

class Services {
    sendEmail(to, subject, body) {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service provider
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: 'team.photofolio@gmail.com', // Your email address
              pass: 'lhiiwnzzurnjwqxl' // Your email password or app-specific password
            }
        });
    
        const mailOptions = {
            from: 'team.photofolio@gmail.com', // Sender email address
            to: to, // Recipient email address
            subject: subject,
            text: body,
          };
          
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
              return info;
            }
          });
    }
}

module.exports = new Services();