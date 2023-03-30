import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { PreRegisterService } from 'src/app/pre-register/pre-register.service';
import { RoleService } from '../../role/role.service';
import { userSchema, updateUserSchema, RequestBody } from './joi';

@Injectable()
export class ValidatePreRegisterMiddleware implements NestMiddleware {
  constructor(
    private preRegisterService: PreRegisterService,
    private roleService: RoleService,
  ) {}
  async use(req: RequestBody, res: Response, next: NextFunction) {
    if (req.method === 'POST') {
      try {
        await userSchema.validateAsync(req.body);
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
        if (isOnPreRegister) throw new Error('Usuário já existe');
        const existRole = await this.roleService.getRoleById(req.body.role_id);
        if (!existRole) throw new Error('Role não existe');
      } catch (e) {
        throw new BadRequestException({
          message: `dados inválidos`,
          errorType: `${e.message}`,
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
    if (req.method === 'PUT') {
      try {
        await updateUserSchema.validateAsync(req.body);
      } catch ({ details }) {
        throw new BadRequestException({
          message: `dados inválidos`,
          errorType: `${details[0].message}`,
          statusCode: 400,
          error: 'Bad Request',
        });
      }
    }
    next();
  }
}
