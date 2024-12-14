import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/common/guards/jwt.guard';
import { Reflector } from '@nestjs/core';
import { ErrorLoggingInterceptor } from './modules/common/interceptors/error-logging.interceptor';
import { HttpExceptionFilter } from './modules/common/exception-filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Enable CORS
  app.enableCors();

  app.useGlobalInterceptors(new ErrorLoggingInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());
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
