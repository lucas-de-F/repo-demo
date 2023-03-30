import { CreatePreRegisterDto } from 'src/app/pre-register/dto/create-pre-register.dto';

export class UserModelWithPreRegister {
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

export class UserModel {
  id: string;
  name: string;
  email: string;
  normalized_name: string;
  normalized_email: string;
  password_hash: string;
  last_access: Date;
  status: boolean;
  pre_register_id: string;
}
