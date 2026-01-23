import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation pipeline for this app:
  // This is where DTOs get relevance, since their validation
  // rules will be enforced one this ValidationPipe gets inserted
  // into the app
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // discard properties in incoming requests that are not defined in DTOs
    forbidNonWhitelisted: true // throw an error if non-whitelisted properties are present
  })); // this is used to validate DTOs coming in
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
