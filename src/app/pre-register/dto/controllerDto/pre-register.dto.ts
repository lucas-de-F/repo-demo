import { ApiProperty } from '@nestjs/swagger';
import { RoleResponse } from 'src/app/role/Dto/controllerDto/role-controller.dto';

export class CreatePreRegisterRequestDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  identification: string;
  @ApiProperty()
  role_id: string;
  @ApiProperty()
  Role?: RoleResponse;
}

export class UpdatePreRegisterRequestDto extends CreatePreRegisterRequestDto {
  @ApiProperty()
  id: string;
}
