import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {

  }

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
