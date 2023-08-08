import { Module } from '@nestjs/common';
import { StripeModule as StripeLibModule } from 'nestjs-stripe';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import Stripe from 'stripe';
@Module({
  imports: [
    StripeLibModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2022-11-15',
    }),
    Stripe,
  ],
  exports: [StripeService],
  providers: [StripeService, Stripe],
  controllers: [StripeController],
})
export class StripeModule {}
