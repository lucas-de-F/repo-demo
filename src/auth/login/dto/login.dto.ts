export class CreateLoginDto {
  email: string;
  password: string;
}

export class Token {
  userId: string;
  name: string;
  email_active: string;
  email: string;
  status: string;
  role_id: string;
  role: string;
  constructor(userId, name, email, status, role_id, role) {
    this.userId = userId;
    this.name = name;
    this.email_active = email;
    this.email = email;
    this.status = status;
    this.role_id = role_id;
    this.role = role;
  }
}
