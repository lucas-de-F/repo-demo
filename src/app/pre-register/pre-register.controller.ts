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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import {
  CreatePreRegisterRequest,
  PreRegisterResponse,
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
  @ApiResponse({ type: PreRegisterResponse })
  create(
    @Body() createPreRegisterDto: CreatePreRegisterRequest,
  ): Promise<PreRegisterResponse> {
    return this.preRegisterService.savePreRegister(createPreRegisterDto);
  }

  @Get()
  @ApiResponse({ type: [PreRegisterResponse] })
  findAll(): Promise<PreRegisterResponse[]> {
    return this.preRegisterService.findAll();
  }

  @ApiResponse({ type: PreRegisterResponse })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<PreRegisterResponse> {
    return this.preRegisterService.findOne(id);
  }

  @Put()
  @ApiResponse({ type: PreRegisterResponse })
  update(
    @Body() updatePreRegisterDto: UpdatePreRegisterRequestDto,
  ): Promise<PreRegisterResponse> {
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
