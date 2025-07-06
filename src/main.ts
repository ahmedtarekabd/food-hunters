import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')

  const config = new DocumentBuilder()
    .setTitle('Food Hunters API')
    .setDescription('The Food Hunters API, a platform for food enthusiasts to discover and follow restaurants.')
    .setVersion('1.0')
    .addTag('Food Hunters')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
}
bootstrap()
