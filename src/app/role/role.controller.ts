import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleResponse } from './Dto/controllerDto/role-controller.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles(): Promise<RoleResponse[]> {
    return this.roleService.getRoles();
  }
}
