import * as Joi from 'joi';
import { Request } from 'express';
import { CreatePreRegisterDto } from '../dto/create-pre-register.dto';
import { UpdatePreRegisterDto } from '../dto/update-pre-register.dto';

export const userSchema = Joi.object<CreatePreRegisterDto>({
  email: Joi.string().required(),
  identification: Joi.string().allow('', null),
  name: Joi.string().required(),
  role_id: Joi.string().guid(),
});

export const updateUserSchema = Joi.object<UpdatePreRegisterDto>({
  id: Joi.string().required(),
  email: Joi.string(),
  identification: Joi.string().allow('', null),
  name: Joi.string(),
  role_id: Joi.string().guid(),
});

export interface RequestBody extends Request {
  body: CreatePreRegisterDto;
}
