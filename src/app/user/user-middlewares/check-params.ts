import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { PreRegisterService } from 'src/app/pre-register/pre-register.service';
import { UserService } from '../user.service';
import { RequestBody, CreateUserSchema } from './joi';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private preRegisterService: PreRegisterService,
  ) {}
  async use(req: RequestBody, res: Response, next: NextFunction) {
    if (req.method === 'POST') {
      try {
        await CreateUserSchema.validateAsync(req.body);
      } catch ({ details }) {
        throw new BadRequestException({
          message: `dados inválidos`,
          errorType: `${details[0].message}`,
          statusCode: 400,
          error: 'Bad Request',
        });
      }
      try {
        const isOnPreRegister = await this.preRegisterService.findOneByEmail(
          req.body.email,
        );
        if (!isOnPreRegister) throw new Error('Usuário sem pré-cadastro');

        const isOnRegister = await this.userService.findOneByEmail(
          req.body.email,
        );
        if (isOnRegister) throw new Error('Usuário já cadastrado');
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
