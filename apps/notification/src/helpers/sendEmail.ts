import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';


export class SendEmails {
    constructor() {
        const filePath = path.resolve( 'apps/notification/src/emailTemplate/verifyAccount.ejs');
        const data = ejs.renderFile(filePath, { name: 'Stranger',confirmation_url:"sdkaajskdasdkj" });
        this.sendEmail("negig3646@gmail.com", "Verify your account", data);
    }

    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ewell.dubuque94@ethereal.email',
            pass: 'CVTTZZR91AdBgCuSCn'
        }
    });

    private log: Logger = new Logger(SendEmails.name);

    async sendEmail(to: string, subject: string, template: string): Promise<void> {
        try {
            const data = await this.transporter.sendMail({
                from: 'ewell.dubuque94@ethereal.email',
                to: 'negig655@gmail.com',
                subject: subject,
                html: '<h1>Hello</h1>',
                text:"Hello"
            })
            console.log(data)
        } catch (error) {
            this.log.error("Error sending email (sendEmail())", error);
        }
    }

    
}  