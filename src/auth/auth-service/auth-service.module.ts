import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwtStrategy.service';
import { RoleGuard } from './strategy/jwtCheckRole.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/app/user/user.service';
import { UserRepository } from 'src/app/user/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwtGuard.service';
import { MiddlewareResolver } from './middlwareResolve';
import { PreRegisterService } from 'src/app/pre-register/pre-register.service';
import { PreRegisterRepository } from 'src/app/pre-register/user.repository';

@Module({
  providers: [
    UserService,
    UserRepository,
    PreRegisterService,
    PreRegisterRepository,
    JwtStrategy,
    RoleGuard,
    PrismaService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [JwtStrategy],
  imports: [
    JwtModule.register({
      verifyOptions: { algorithms: ['HS256'] },
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class ApplicationModulesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MiddlewareResolver(consumer);
  }
}
export class AuthServiceModule {}
