import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { adminConfig } from '../etc/secrets/wadwai-official-firebase-adminsdk-49ow7-a39fcd7be2';
import { ServiceAccount } from 'firebase-admin';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig as ServiceAccount),
  });

  await app.listen(3001);
}

bootstrap();
