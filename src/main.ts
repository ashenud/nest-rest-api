import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const config = new DocumentBuilder()
    .setTitle('Nest Rest API')
    .setDescription('The Nest Rest API description')
    .setVersion('1.0')
    .addTag('nest-rest')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    app,
    documentFactory,
  );

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
