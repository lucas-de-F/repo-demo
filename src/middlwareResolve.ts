import { MiddlewareConsumer } from '@nestjs/common';
import { PreRegisterController } from './app/pre-register/pre-register.controller';
import { ValidatePreRegisterMiddleware } from './app/pre-register/user-middlewares/check-params';
import { ValidateUserMiddleware } from './app/user/user-middlewares/check-params';
import { UserController } from './app/user/user.controller';
import { ValidateLoginMiddleware } from './auth/login/check-params';
import { LoginController } from './auth/login/login.controller';

export function MiddlewareResolver(consumer: MiddlewareConsumer) {
  consumer
    .apply(ValidatePreRegisterMiddleware)
    .forRoutes(PreRegisterController);
  consumer.apply(ValidateUserMiddleware).forRoutes(UserController);

  consumer.apply(ValidateLoginMiddleware).forRoutes(LoginController);
}
