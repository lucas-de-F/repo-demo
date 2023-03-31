import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/app/login/dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async signToken(paylaod: Token) {
    return this.jwtService.sign(
      { ...paylaod },
      {
        secret: process.env['JWT_SECRET'],
      },
    );
  }

  async validate(payload) {
    return {
      ...payload,
    };
  }
}
