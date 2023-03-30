import { UserModel } from 'src/app/user/dto/modelDto/user.model';

export class UpdatePreRegisterDto {
  name: string;
  email: string;
  identification: string;
  role_id: string;
  id: string;
}

export class ResponsePreRegister {
  name: string;
  email: string;
  identification: string;
  role_id: string;
  id: string;
  User: UserModel;
}
