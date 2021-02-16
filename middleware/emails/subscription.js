const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const html  = (`
        <html>
              <head>
                <title>WELCOME TO 2CONNECT</title>
              </head>
              <body>
                  <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                    <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, 
                        sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" src="http://cdn.mcauto-images-production.sendgrid.net/ecfb6883ae4fe688/b7303e83-a8bb-4557-a30f-ea5c0d036b3e/5000x5000.png" 
                        alt="" width="600" data-responsive="true" data-proportionally-constrained="false">
                  </td>
                  <div style="font-family: inherit; text-align: center">
                      <span style="color: #516775; font-size: 28px; font-family: georgia, serif">
                          <strong>
                              Welcome to &nbsp; 2Connect
                          </strong>
                      </span>
                  </div>

                  <div style="font-family: inherit; text-align: center; margin : 5%">
                      <span style="font-family: verdana, geneva, sans-serif">
                            Welcome to 2Connect, the online networking platform that allows you to connect with likeminded people all over Africa and the World
                      </span>
                  </div>
                  <div style="font-family: inherit; text-align: center">
                      <span style="color: #993300; font-size: 28px; font-family: georgia, serif">
                          <strong>
                              Enjoy your journey with 2Connect
                          </strong>
                      </span>
                  </div>
              </body>
          </html>
`)

const welcomeEmail = async (email ) => {

    const msg = {
        to: email,
        from: 'jordytshibss@gmail.com',
        subject: 'Welcome to the Congolese Professioanls Network',
        text: 'We hope you\'ll enjoy it right away ...',
        html
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
    exports.welcomeEmail = welcomeEmail

    