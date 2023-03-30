import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { BypassAuth } from 'src/auth/auth-service/guards/jwtGuard.service';
import { LoginUserDto } from './dto/controllerDto/user-controller.dto';
import { UserResponse } from './dto/controllerDto/user-controller-response.dto';

@ApiTags('Cadastro')
@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @BypassAuth()
  @Post()
  async saveUser(@Body() createUserDto: LoginUserDto): Promise<UserResponse> {
    return this.userService.saveUser(createUserDto);
  }
}
