import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';


export class SendEmails {
    constructor() {
        
       
    }

    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'scarlett.daniel@ethereal.email',
            pass: 'eJ7B6BRPeqbj4EQADw'
        }
    });

    private log: Logger = new Logger(SendEmails.name);

    async sendEmail(to: string, subject: string, template: string): Promise<void> {
        try {
            const filePath = path.resolve('apps/notification/src/emailTemplate/verifyAccount.ejs');
            const template = ejs.renderFile(filePath, { name: 'Stranger', otp:"1234" });
            const data = await this.transporter.sendMail({
                from: 'scarlett.daniel@ethereal.email',
                to: 'negig3646@gmail.com',
                subject: subject,
                html: template, // `.ejs` extension is appended automatically
            })
        } catch (error) {
            this.log.error("Error sending email (sendEmail())", error);
        }
    }


}  