import { CreatePreRegisterDto } from 'src/app/pre-register/dto/create-pre-register.dto';
import { UserWithPreRegister } from './user-service.dto';

export class UserWithPreRegisterResponse {
  name: string;
  email: string;
  normalized_name: string;
  normalized_email: string;
  password_hash: string;
  last_access: Date;
  status: boolean;
  pre_register_id: string;
  id: string;
  Pre_register: CreatePreRegisterDto;
}
export class CreateUserResponse {
  name: string;
  email: string;
  role_name: string;

  constructor(user: UserWithPreRegister) {
    this.name = user.name;
    this.email = user.email;
    this.role_name = user.Pre_register.Role.name;
  }
}
export interface UserResponse {
  name: string;
  email: string;
  role_name: string;
}
