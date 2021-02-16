const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const applyJob = async (senderemail, recipientEmail, title, content) => {

    const msg = {
        to: recipientEmail,
        from: 'jordytshibss@gmail.com',
        subject: title,
        text: 'We hope you\'ll enjoy it right away ...',
        html: content
      };
      
        try {
          await sgMail.send(msg);

        } catch (error) {
          console.error(error);
       
          if (error.response) {
            console.error(error.response.body)
          }
        }
}
    exports.applyJob = applyJob

    