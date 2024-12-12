import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/guards/jwt.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  // Parse port from environment variable or use default
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
