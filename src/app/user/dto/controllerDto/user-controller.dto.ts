import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
