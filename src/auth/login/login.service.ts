import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { CreateLoginDto, Token } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from '../auth-service/strategy/jwtStrategy.service';
import {
  User,
  UserWithPreRegister,
} from 'src/app/user/dto/serviceDto/user-service.dto';

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

    const tokenObj = new Token(
      user.id,
      user.name,
      user.email,
      user.status,
      user.Pre_register.Role.id,
      user.Pre_register.Role.name,
    );

    var token = await this.JwtStrategy.signToken(tokenObj);

    delete user.Pre_register;
    await this.setLastAccess(user as User);

    return { token };
  }

  setLastAccess(user: User) {
    this.userService.update({ ...user, last_access: new Date() });
  }
}
