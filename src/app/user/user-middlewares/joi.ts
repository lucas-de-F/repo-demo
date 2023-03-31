import * as Joi from 'joi';
import { Request } from 'express';
import { LoginUserDto } from '../dto/controllerDto/user-controller.dto';

export interface RequestBody extends Request {
  body: LoginUserDto;
}

export const RegisterSchema = Joi.object({
  email: Joi.string().email(),

  password: Joi.string()
    .min(6)
    .pattern(/[A-Z]+/, 'Precisa ter pelo menos 1 letra maiúscula')
    .pattern(/[a-z]+/, 'Precisa ter pelo menos 1 letra minúscula')
    .pattern(/[0-9]+/, 'Precisa ter pelo menos 1 número')
    .pattern(
      /[ -\/:-@\[-\`{-~]/,
      'Precisa ter pelo menos 1 caractere especial',
    ),
});
