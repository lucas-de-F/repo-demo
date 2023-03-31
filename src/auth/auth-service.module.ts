import { Module } from '@nestjs/common';
import { RoleGuard } from './guards/jwtCheckRole.guard';
import { UserService } from 'src/app/user/user.service';
import { UserRepository } from 'src/app/user/user.repository';
import { PreRegisterService } from 'src/app/pre-register/pre-register.service';
import { PreRegisterRepository } from 'src/app/pre-register/user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwtService/jwtStrategy.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  providers: [
    UserService,
    UserRepository,
    PreRegisterService,
    PreRegisterRepository,
    JwtStrategy,
    JwtService,
    RoleGuard,
    PrismaService,
  ],
  exports: [JwtStrategy, JwtService, PrismaService],
})
export class AuthServiceModule {}
