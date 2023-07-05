import { Injectable } from '@nestjs/common';
import {
  CreatePreRegister,
  PreRegister,
  UpdatePreRegister,
} from './dto/modelDto/pre-register.dto';
import { PrismaService } from '../../infra/prisma/prisma.service';

const include = { Role: true, User: true };

@Injectable()
export class PreRegisterRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreatePreRegister) {
    return await this.prisma.pre_Register.create({
      data: {
        ...createUserDto,
      },
      include,
    });
  }

  async update(user: UpdatePreRegister): Promise<PreRegister> {
    return await this.prisma.pre_Register.update({
      where: { id: user.id },
      data: {
        ...user,
      },
      include,
    });
  }

  async delete(id: string): Promise<PreRegister> {
    return await this.prisma.pre_Register.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<PreRegister> {
    return await this.prisma.pre_Register.findFirst({
      where: { id },
      include,
    });
  }
  async findOneByEmail(email: string): Promise<PreRegister> {
    return await this.prisma.pre_Register.findFirst({
      where: { email },
      include,
    });
  }
  async findOneByName(name: string): Promise<PreRegister> {
    return await this.prisma.pre_Register.findFirst({
      where: { name },
      include,
    });
  }
  async findAll(): Promise<PreRegister[]> {
    return await this.prisma.pre_Register.findMany({ include });
  }
}
