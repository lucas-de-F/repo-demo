export class CreatePreRegisterDto {
  name: string;
  email: string;
  identification: string;
  role_id: string;
  Role?: Role;
}
interface Role {
  id: string;
  name: string;
}

export class CreatePreRegisterDtoRepository {
  name: string;
  email: string;
  identification: string;
  role_id: string;
}
