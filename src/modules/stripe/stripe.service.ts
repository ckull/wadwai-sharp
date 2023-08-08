import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { PaymentIntentDto } from './dto/payment-intent.dto';
@Injectable()
export class StripeService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createCheckoutSession(paymentIntentDto: PaymentIntentDto) {
    return this.stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1NYMoBDy62QPjqFXQmNl97eW',
          quantity: 1,
        },
        {
          price: 'price_1NYMn7Dy62QPjqFXGc9QlwqX',
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: 'http://your-website.com/success', // Redirect after successful payment
      cancel_url: 'http://your-website.com/cancel', // Redirect after canceled payment
    });
  }
}
