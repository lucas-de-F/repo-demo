import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  normalized_name: string;
  @ApiProperty()
  normalized_email: string;
  @ApiProperty()
  password_hash: string;
  @ApiProperty()
  last_access: Date;
  @ApiProperty()
  pre_register_id: string;
}
