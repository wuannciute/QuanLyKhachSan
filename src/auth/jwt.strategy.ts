import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '6276bb15-3c31-466e-bca2-eb8523d44037', // Ưu tiên từ env
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
