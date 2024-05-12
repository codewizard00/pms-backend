import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'libs/common/response/structure';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: { enableImplicitConversion: true },
    whitelist: true, // Removes non-whitelisted properties from the incoming request data
    forbidNonWhitelisted: true, // Throws an error if any non-whitelisted properties are found
    transform: true, // Automatically transforms request data to the specified DTO type
}));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
