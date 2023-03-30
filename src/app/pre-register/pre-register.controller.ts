import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PreRegisterService } from './pre-register.service';
import { CreatePreRegisterDto } from './dto/create-pre-register.dto';
import { UpdatePreRegisterDto } from './dto/update-pre-register.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('Pré Cadastro')
@Controller('pre-register')
export class PreRegisterController {
  constructor(
    private readonly preRegisterService: PreRegisterService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createPreRegisterDto: CreatePreRegisterDto) {
    return this.preRegisterService.savePreRegister(createPreRegisterDto);
  }

  @Get()
  findAll() {
    return this.preRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preRegisterService.findOne(id);
  }

  @Put()
  update(@Body() updatePreRegisterDto: UpdatePreRegisterDto) {
    return this.preRegisterService.update(updatePreRegisterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.preRegisterService.findOne(id);
    if (user.User) {
      await this.userService.remove(user.User.id);
    }
    return this.preRegisterService.remove(id);
  }
}
