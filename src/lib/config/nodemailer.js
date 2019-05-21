import dotenv from 'dotenv';
dotenv.config();
export default class Mail {
  static transportOptions() {
    return {
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'automart144@gmail.com',
        pass: 'OkafoR@1993',
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
  }

  static MailOptionsReset(name, url, to) {
    const text = `<!DOCTYPE html>
      <html>
      
      <head>
          <title>Forget Password Email</title>
      </head>
      
      <body>
          <div>
              <h3>Dear ${name},</h3>
              <p>You requested for a password reset, kindly use this <a href="${url}">link</a> to reset your password</p>
              <br>
              <small>Link expires after 1 hour</small>
              <br>
              <p>Cheers!</p>
          </div>
         
      </body>
      
      </html>`;
    return {
      from: process.env.AUTOMART_EMAIL,
      to,
      subject: 'Password help has arrived!',
      html: text,
    };
  }

  static MailOptionsConfirm(name, to) {
    const text = `<!DOCTYPE html>
    <html>
    
    <head>
        <title>Password Reset</title>
    </head>
    
    <body>
        <div>
            <h3>Dear ${name},</h3>
            <p>Your password has been successful reset, you can now login with your new password.</p>
            <br>
            <div>
                Cheers!
            </div>
        </div>
       
    </body>
    
    </html>`;
    return {
      from: process.env.AUTOMART_EMAIL,
      to,
      subject: 'Your Password has being Updated Succesfully!',
      html: text,
    };
  }
}
