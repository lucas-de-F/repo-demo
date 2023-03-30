import { UserModel } from 'src/app/user/dto/modelDto/user.model';

export class PreRegister {
  id: string;
  name: string;
  email: string;
  identification: string;
  role_id: string;
  User?: UserModel;
}

export class CreatePreRegister {
  name: string;
  email: string;
  identification: string;
  role_id: string;
}

export class UpdatePreRegister extends CreatePreRegister {
  id: string;
}
