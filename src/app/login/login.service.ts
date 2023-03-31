import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { LoginRequest, Token } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import {
  User,
  UserWithPreRegister,
} from 'src/app/user/dto/serviceDto/user-service.dto';
import { JwtStrategy } from 'src/auth/jwtService/jwtStrategy.service';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private jwtStrategy: JwtStrategy,
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

  async checkPass(login: LoginRequest) {
    const user = await this.getUser(login);

    const isHashTrue = await bcrypt.compare(login.password, user.password_hash);

    if (!isHashTrue) throw new ForbiddenException('Senha inválida');

    const tokenObj = new Token(user);

    const token = await this.jwtStrategy.signToken(tokenObj);

    delete user.Pre_register;
    this.setLastAccess(user as User);

    return { token };
  }

  setLastAccess(user: User) {
    this.userService.update({ ...user, last_access: new Date() });
  }
}
