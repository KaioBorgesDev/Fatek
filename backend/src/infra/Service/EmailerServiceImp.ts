import { EmailerService } from "src/adapters/services/EmailerService";
const nodemailer = require("nodemailer");

export default class EmailerServiceImp implements EmailerService{
    private sender_adress = process.env.SENDER_ADRESS;
    private pass_adress = process.env.PASS_ADRESS;
    private port = process.env.PORT_EMAIL;
    private host = process.env.HOST_EMAIL;

    private transporter = nodemailer.createTransport({
        host: this.host,
        port: this.port,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: this.sender_adress,
          pass: this.pass_adress,
        },
      });

    async sendEmail(email_destination: string, subject:string, html: String, text: string | null ): Promise<void> {
        const info = await this.transporter.sendMail({
            from: `"Ser Dev 👻" <${this.sender_adress}>`, // sender address
            to: email_destination, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
          });
        console.log("Message sent: %s", info.messageId);
    }


}
