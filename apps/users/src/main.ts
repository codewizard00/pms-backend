import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from 'libs/common';
import { RmqOptions } from '@nestjs/microservices';
import { ResponseInterceptor } from 'libs/common/response/structure';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Removes non-whitelisted properties from the incoming request data
    forbidNonWhitelisted: true, // Throws an error if any non-whitelisted properties are found
    transform: true, // Automatically transforms request data to the specified DTO type
}));
const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
