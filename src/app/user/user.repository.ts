import { Injectable } from '@nestjs/common';
import { UserModel, UserModelWithPreRegister } from './dto/modelDto/user.model';
import { PrismaService } from '../../infra/prisma/prisma.service';

const include = { Pre_register: { include: { Role: true } } };

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserModel): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
      include,
    });
  }

  async update(user: UserModel): Promise<UserModelWithPreRegister> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
      include,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<UserModelWithPreRegister> {
    return await this.prisma.user.findFirst({
      where: { email },
      include,
    });
  }
}
