import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtStrategy } from './strategy/jwtStrategy.service';
import { RoleGuard } from './strategy/jwtCheckRole.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/app/user/user.service';
import { UserRepository } from 'src/app/user/user.repository';
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
  ],
})
export class ApplicationModulesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MiddlewareResolver(consumer);
  }
}
export class AuthServiceModule {}
