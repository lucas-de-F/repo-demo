import { ApiProperty } from '@nestjs/swagger';

export class RoleResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
}
