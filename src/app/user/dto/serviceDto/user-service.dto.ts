import * as bcrypt from 'bcrypt';
import { CreatePreRegisterRequestDto } from 'src/app/pre-register/dto/controllerDto/pre-register.dto';

export class LoginUserDto {
  email: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  normalized_name: string;
  normalized_email: string;
  password_hash: string;
  last_access: Date;
  pre_register_id: string;
  constructor(name: string, email: string, password: string, pre_register_id) {
    const passwordHash = bcrypt.hashSync(password, 10);

    this.name = name;
    this.email = email;
    this.normalized_email = this.email.toUpperCase();
    this.normalized_name = this.name.toUpperCase();
    this.last_access = new Date();
    this.password_hash = passwordHash;
    this.pre_register_id = pre_register_id;
  }
}
export class UserWithPreRegister extends User {
  Pre_register: CreatePreRegisterRequestDto;
}
