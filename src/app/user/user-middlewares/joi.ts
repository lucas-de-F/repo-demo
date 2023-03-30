import * as Joi from 'joi';
import { Request } from 'express';
import { LoginUserDto } from '../dto/controllerDto/user-controller.dto';

export const CreateUserSchema = Joi.object<LoginUserDto>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export interface RequestBody extends Request {
  body: LoginUserDto;
}
