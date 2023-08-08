import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { FirebaseAuthMiddleware } from 'src/middlewares/firebase.middleware';
import { InventoryMiddleware } from 'src/middlewares/inventory.middleware';
import { StripeModule } from '../stripe/stripe.module';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [StripeModule, PrismaModule],
  controllers: [PurchaseController],
  // providers: [PurchaseService],
})
export class PurchaseModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(FirebaseAuthMiddleware, InventoryMiddleware)
  //     .forRoutes('/purchase');
  // }
}
