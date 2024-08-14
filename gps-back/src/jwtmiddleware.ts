import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      req.user = { userId: decoded.sub }; // Certifique-se de que 'sub' é o campo correto para o ID do usuário
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}