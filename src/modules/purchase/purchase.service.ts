import { Injectable } from '@nestjs/common';
import { Stripe } from '@stripe/stripe-js';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}
  purchase(purchaseInventoryDto: any) {}
}
