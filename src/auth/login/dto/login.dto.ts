import {
  User,
  UserWithPreRegister,
} from 'src/app/user/dto/serviceDto/user-service.dto';

export class CreateLoginDto {
  email: string;
  password: string;
}

export class Token {
  user_id: string;
  name: string;
  email: string;
  role_id: string;
  role: string;
  constructor({
    id: userId,
    name: userName,
    email,
    Pre_register: {
      Role: { name: roleName, id: roleId },
    },
  }: UserWithPreRegister) {
    this.user_id = userId;
    this.name = userName;
    this.email = email;
    this.role_id = roleId;
    this.role = roleName;
  }
}
