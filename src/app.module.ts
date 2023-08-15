import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AddressModule } from './modules/address/address.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { StripeController } from './modules/stripe/stripe.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AddressModule,
    PurchaseModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
