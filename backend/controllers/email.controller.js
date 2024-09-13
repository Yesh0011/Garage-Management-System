
import nodemailer from 'nodemailer';

export const sentEmail = async(req ,res) => {

    try{
        const {to , subject,text} = req.body;

        const transporter = nodemailer.createTransport({

            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
          };
          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully");
          res.send("Email sent successfully");
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        }
      };
      
     