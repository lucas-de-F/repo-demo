import { RoleResponse } from 'src/app/role/Dto/controllerDto/role-controller.dto';

export class CreatePreRegisterRequestDto {
  name: string;
  email: string;
  identification: string;
  role_id: string;
  Role?: RoleResponse;
}

export class UpdatePreRegisterRequestDto extends CreatePreRegisterRequestDto {
  id: string;
}
