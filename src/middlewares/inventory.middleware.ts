// inventory.middleware.ts
import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class InventoryMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const { productId, quantity } = req.body;

    if (typeof productId !== 'string' || typeof quantity !== 'number') {
      throw new BadRequestException('Invalid payload');
    }

    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
      include: { Inventory: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { Inventory } = product;
    const newQuantity = Inventory.quantity - quantity;

    if (newQuantity < 0) {
      throw new BadRequestException('Not enough quantity in inventory');
    }

    // Attach the product and inventory data to the request object
    req.product = product;
    req.newQuantity = newQuantity;

    next();
  }
}
