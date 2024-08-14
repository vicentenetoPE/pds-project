import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface CoreResponse {
  user_code: string;
  iat: number;
  exp: number;
  iss: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('TOKEN_VERIFICATION_PUB_KEY'),
      ignoreExpiration: false,
      issuer: 'nucleo-api',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: CoreResponse) {
    return { employeeCode: payload.user_code };
  }
}
