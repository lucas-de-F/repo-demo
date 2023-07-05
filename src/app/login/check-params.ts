import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { PreRegisterService } from '../../app/pre-register/pre-register.service';
import { RequestBody } from '../../app/pre-register/user-middlewares/joi';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private preRegisterService: PreRegisterService,
  ) {}
  async use(req: RequestBody, res: Response, next: NextFunction) {
    if (req.method === 'POST') {
      try {
        const user = await this.userService.findOneByEmail(req.body.email);
        if (user === null) throw Error('Usuário Inválido');
        if (user.Pre_register === null) throw Error('Usuário Inativo');
      } catch (e) {
        throw new BadRequestException({
          message: `dados inválidos`,
          errorType: `${e.message}`,
          statusCode: 400,
          error: 'Bad Request',
        });
      }
      try {
        const isOnPreRegister = await this.preRegisterService.findOneByEmail(
          req.body.email,
        );
        if (!isOnPreRegister) throw new Error('Usuário sem pré-cadastro');
      } catch (e) {
        throw new BadRequestException({
          message: `dados inválidos`,
          errorType: `${e.message}`,
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
    next();
  }
}
