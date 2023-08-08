import {
  Controller,
  Post,
  Req,
  Res,
  // Response,
  // Request,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeClient: Stripe) {}

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('req', req.body);
    console.log('handlwWebasdasdasd');
    const sig = req.headers['stripe-signature'];
    try {
      const event = this.stripeClient.webhooks.constructEvent(
        req.body,
        sig,
        'whsec_c49748d5e61302947bbddec31616df5a8cea4c99791673e39d3131958efaa061',
      );
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Update your database with the successful payment information

        console.log('succeeded order', paymentIntent);
      }

      res.status(HttpStatus.OK).send();
    } catch (error) {
      console.error('Error handling webhook:', error.stack);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
