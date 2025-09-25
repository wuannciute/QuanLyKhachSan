import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 🛠️ Đặt dòng này trước

  app.useLogger(['log', 'debug', 'error', 'warn']); // ✅ Bật log chi tiết
  app.useGlobalPipes(new ValidationPipe());         // ✅ Validation
  app.useGlobalInterceptors(new ResponseInterceptor()); // ✅ Interceptor
  app.enableCors();                                 // ✅ CORS

  await app.listen(process.env.PORT || 3000);       // ✅ Listen
}
bootstrap();
