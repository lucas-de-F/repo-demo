import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserController } from './app/user/user.controller';
import { UserRepository } from './app/user/user.repository';
import { UserService } from './app/user/user.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configEnv/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RoleController } from './app/role/role.controller';
import { RoleService } from './app/role/role.service';
import { RoleRepository } from './app/role/role.repository';
import { PreRegisterRepository } from './app/pre-register/user.repository';
import { PreRegisterService } from './app/pre-register/pre-register.service';
import { PreRegisterController } from './app/pre-register/pre-register.controller';
import { AuthServiceModule } from './auth/auth-service/auth-service.module';
import { JwtStrategy } from './auth/auth-service/strategy/jwtStrategy.service';
import { JwtGuard } from './auth/auth-service/guards/jwtGuard.service';
import { LoginController } from './auth/login/login.controller';
import { LoginService } from './auth/login/login.service';
import { MiddlewareResolver } from './middlwareResolve';

@Module({
  imports: [
    AuthServiceModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule.register({
      verifyOptions: { algorithms: ['HS256'] },
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    LoginController,
    PreRegisterController,
    UserController,
    RoleController,
  ],
  providers: [
    UserService,
    UserRepository,
    LoginService,
    PreRegisterRepository,
    RoleService,
    PreRegisterService,
    RoleRepository,
    PrismaService,
    JwtStrategy,
    JwtService,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MiddlewareResolver(consumer);
  }
}
