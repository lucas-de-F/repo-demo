import * as Joi from 'joi';
import { Request } from 'express';
import {
  CreatePreRegisterRequest,
  UpdatePreRegisterRequestDto,
} from '../dto/controllerDto/pre-register.dto';

export const userSchema = Joi.object<CreatePreRegisterRequest>({
  email: Joi.string().required(),
  identification: Joi.string().allow('', null),
  name: Joi.string().required(),
  role_id: Joi.string().guid(),
});

export const updateUserSchema = Joi.object<UpdatePreRegisterRequestDto>({
  id: Joi.string().required(),
  email: Joi.string(),
  identification: Joi.string().allow('', null),
  name: Joi.string(),
  role_id: Joi.string().guid(),
});

export interface RequestBody extends Request {
  body: CreatePreRegisterRequest;
}
