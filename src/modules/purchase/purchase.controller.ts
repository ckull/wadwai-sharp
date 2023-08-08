import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';
import { StripeService } from '../stripe/stripe.service';
import { PaymentIntentDto } from '../stripe/dto/payment-intent.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  purchase(@Body() paymentIntentDto: PaymentIntentDto) {
    return this.stripeService.createCheckoutSession(paymentIntentDto);
  }
}
