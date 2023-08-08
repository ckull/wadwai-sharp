// firebase.middleware.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request | any, res: Response, next: NextFunction) {
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
