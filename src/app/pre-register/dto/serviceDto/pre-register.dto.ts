export class PreRegisterResponse {
  name: string;
  email: string;
  identification: string;
  role_id: string;
}

export class UpdatePreRegisterResponse extends PreRegisterResponse {
  id: string;
}
