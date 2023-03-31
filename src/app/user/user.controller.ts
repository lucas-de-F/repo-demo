import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserRequest } from './dto/controllerDto/user-controller.dto';
import { BypassAuth } from 'src/auth/rolesDecorator';

@ApiTags('Cadastro')
@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @BypassAuth()
  @Post()
  async saveUser(@Body() createUserDto: RegisterUserRequest): Promise<void> {
    await this.userService.saveUser(createUserDto);
  }
}
