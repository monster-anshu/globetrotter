import { AppModule } from '@/app.module';
import { SessionMiddlewareFn } from '@/session/session.middleware';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1/globetrotter');
  app.useGlobalPipes(new ZodValidationPipe());
  app.use(cookieParser());
  app.use(SessionMiddlewareFn);

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Globetrotter')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    useGlobalPrefix: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

void patchNestJsSwagger();
void bootstrap();
