import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { CreateLoginDto, Token } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import {
  User,
  UserWithPreRegister,
} from 'src/app/user/dto/serviceDto/user-service.dto';
import { JwtStrategy } from 'src/auth/auth-service/strategy/jwtStrategy.service';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private JwtStrategy: JwtStrategy,
  ) {}
  async getUser(login) {
    const user: UserWithPreRegister = await this.userService.findOneByEmail(
      login.email,
    );

    if (!user) throw new BadRequestException('Usuário não existe');

    return {
      ...user,
    };
  }

  async checkPass(login: CreateLoginDto) {
    const user = await this.getUser(login);

    const isHashTrue = await bcrypt.compare(login.password, user.password_hash);

    if (!isHashTrue) throw new ForbiddenException('Senha inválida');

    const tokenObj = new Token(user);

    var token = await this.JwtStrategy.signToken(tokenObj);

    delete user.Pre_register;
    await this.setLastAccess(user as User);

    return { token };
  }

  setLastAccess(user: User) {
    this.userService.update({ ...user, last_access: new Date() });
  }
}