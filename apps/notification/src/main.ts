import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'hero',
        protoPath: join("apps",'proto/notification.proto'),
        url: '0.0.0.0:50052',
      },
    },
  );
  
  await app.listen();
}
bootstrap();
