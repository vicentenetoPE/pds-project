import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  userId:string;
  jwt_secret:string;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwt_secret = this.configService.get<string>('JWT_SECRET');
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret:this.jwt_secret,
        
      }),
    };
  }
  async validateToken(token: string) {
    try {
      const [type, jwt] = token.split(' ') ?? [];
      const decoded = await this.jwtService.verifyAsync(jwt, {
        secret: this.jwt_secret
      });
      const user = this.usersService.findOneById(decoded.sub)
      return user;
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('Invalid token');
    }
  }

}
