import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePreRegisterDtoRepository } from './dto/create-pre-register.dto';
import {
  ResponsePreRegister,
  UpdatePreRegisterDto,
} from './dto/update-pre-register.dto';

const include = { Role: true, User: true };

@Injectable()
export class PreRegisterRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreatePreRegisterDtoRepository) {
    return await this.prisma.pre_Register.create({
      data: {
        ...createUserDto,
      },
      include,
    });
  }

  async update(user: UpdatePreRegisterDto): Promise<UpdatePreRegisterDto> {
    return await this.prisma.pre_Register.update({
      where: { id: user.id },
      data: {
        ...user,
      },
      include,
    });
  }

  async delete(id: string): Promise<UpdatePreRegisterDto> {
    return await this.prisma.pre_Register.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<ResponsePreRegister> {
    return await this.prisma.pre_Register.findFirst({
      where: { id },
      include,
    });
  }
  async findOneByEmail(email: string): Promise<UpdatePreRegisterDto> {
    return await this.prisma.pre_Register.findFirst({
      where: { email },
      include,
    });
  }
  async findOneByName(name: string): Promise<UpdatePreRegisterDto> {
    return await this.prisma.pre_Register.findFirst({
      where: { name },
      include,
    });
  }
  async findAll(): Promise<UpdatePreRegisterDto[]> {
    return await this.prisma.pre_Register.findMany({ include });
  }
}
