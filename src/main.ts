import { NestFactory }                    from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                      from './AppModule';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

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

    await app.listen(3000);

}

bootstrap();
