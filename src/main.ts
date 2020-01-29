import { ValidationPipe }                 from '@nestjs/common';
import { NestFactory }                    from '@nestjs/core';
import { NestExpressApplication }         from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionsFilter }         from './_lib/exceptions/GlobalExceptionsFilter';
import { AppModule }                      from './AppModule';

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {

        cors: {

            origin: [

                'http://localhost:8082', // local user interface
                'https://*.odin.com'

            ]

        }

    });

    const options = new DocumentBuilder().setTitle('ideation.works')
                                         .setDescription('ideation.works REST API')
                                         .setVersion('1.0')
                                         .addTag('ideas')
                                         .addTag('users')
                                         .addTag('organizations')
                                         .addBearerAuth()
                                         .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe({ transform: true })); // required for class-validator
    app.useGlobalFilters(new GlobalExceptionsFilter());
    app.disable('x-powered-by');

    await app.listen(3000);

}

bootstrap();
