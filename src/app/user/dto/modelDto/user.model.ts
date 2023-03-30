import { CreatePreRegisterRequestDto } from 'src/app/pre-register/dto/controllerDto/pre-register.dto';

export class UserModel {
  id: string;
  name: string;
  email: string;
  normalized_name: string;
  normalized_email: string;
  password_hash: string;
  last_access: Date;
  pre_register_id: string;
}

export class UserModelWithPreRegister extends UserModel {
  Pre_register: CreatePreRegisterRequestDto;
}
