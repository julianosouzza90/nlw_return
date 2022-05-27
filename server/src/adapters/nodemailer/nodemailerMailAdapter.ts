import nodemailer from 'nodemailer';
import { SendMailData, MailAdapter } from "../mailAdapter";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c06cc109e9efa6",
    pass: "64676caff003e0"
  }
});


export class NodemailerMailAdapter implements MailAdapter {

  async sendMail({subject, body}: SendMailData) {
  
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Juliano Souza <souzza.s1990@gmail.com>',
      subject,
      html:body
    })
  }
    
}