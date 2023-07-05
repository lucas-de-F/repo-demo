import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AppModule } from '../../app.module';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceModule } from '../../auth/auth-service.module';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthServiceModule],
      providers: [LoginService, UserService],
      controllers: [LoginController, UserController, JwtService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
