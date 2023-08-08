import { Module, MiddlewareConsumer } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { FirebaseAuthMiddleware } from 'src/middlewares/firebase.middleware';
import { InventoryMiddleware } from 'src/middlewares/inventory.middleware';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, InventoryMiddleware],
})
export class InventoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebaseAuthMiddleware, InventoryMiddleware)
      .forRoutes('/purchase');
  }
}
