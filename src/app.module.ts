import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './app/user/user.controller';
import { UserRepository } from './app/user/user.repository';
import { UserService } from './app/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './infra/config/configEnv/config';
import { JwtModule } from '@nestjs/jwt';
import { RoleController } from './app/role/role.controller';
import { RoleService } from './app/role/role.service';
import { RoleRepository } from './app/role/role.repository';
import { PreRegisterRepository } from './app/pre-register/user.repository';
import { PreRegisterService } from './app/pre-register/pre-register.service';
import { PreRegisterController } from './app/pre-register/pre-register.controller';
import { AuthServiceModule } from './auth/auth-service.module';
import { MiddlewareResolver } from './middlwareResolve';
import { LoginController } from './app/login/login.controller';
import { LoginService } from './app/login/login.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwtGuard.guard';

@Module({
  imports: [
    AuthServiceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
        verifyOptions: { algorithms: ['HS256'] },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
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
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MiddlewareResolver(consumer);
  }
}
