import { CreatePreRegisterRequestDto } from 'src/app/pre-register/dto/controllerDto/pre-register.dto';

export class UserWithPreRegisterResponse {
  name: string;
  email: string;
  normalized_name: string;
  normalized_email: string;
  password_hash: string;
  last_access: Date;
  pre_register_id: string;
  id: string;
  Pre_register: CreatePreRegisterRequestDto;
}
