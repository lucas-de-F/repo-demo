import { ApiProperty } from '@nestjs/swagger';
import { RoleResponse } from 'src/app/role/Dto/controllerDto/role-controller.dto';
import { UserResponse } from 'src/app/user/dto/controllerDto/user-controller.dto';

export class CreatePreRegisterRequest {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  identification: string;
  @ApiProperty()
  role_id: string;
}

export class UpdatePreRegisterRequestDto extends CreatePreRegisterRequest {
  @ApiProperty()
  id: string;
}

export class PreRegisterResponse extends UpdatePreRegisterRequestDto {
  @ApiProperty()
  Role?: RoleResponse;
  @ApiProperty()
  User?: UserResponse;
}
