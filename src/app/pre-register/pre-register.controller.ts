import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PreRegisterService } from './pre-register.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import {
  CreatePreRegisterRequestDto,
  UpdatePreRegisterRequestDto,
} from './dto/controllerDto/pre-register.dto';

@ApiTags('Pré Cadastro')
@Controller('pre-register')
export class PreRegisterController {
  constructor(
    private readonly preRegisterService: PreRegisterService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createPreRegisterDto: CreatePreRegisterRequestDto) {
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
  update(@Body() updatePreRegisterDto: UpdatePreRegisterRequestDto) {
    return this.preRegisterService.update(updatePreRegisterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.preRegisterService.findOne(id);
    if (user.User) {
      await this.userService.remove(user.User.id);
    }
    this.preRegisterService.remove(id);
  }
}
