import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FirebaseAuthMiddleware } from 'src/middlewares/firebase.middleware';
import { InventoryMiddleware } from 'src/middlewares/inventory.middleware';
@Module({
  imports: [PrismaModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes('address');
  }
}
