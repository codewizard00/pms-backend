import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SendEmails } from './helpers/sendEmail';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService,SendEmails],
})
export class NotificationModule {}
