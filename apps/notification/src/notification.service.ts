import { Injectable } from '@nestjs/common';
import { SendEmails } from './helpers/sendEmail';

@Injectable()
export class NotificationService {
    constructor(
      private sendEmail:SendEmails,
    ) {}
}
