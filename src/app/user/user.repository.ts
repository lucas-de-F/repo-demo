import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUser } from './dto/serviceDto/user-service.dto';
import { UserModel, UserModelWithPreRegister } from './dto/modelDto/user.model';

const include = { Pre_register: { include: { Role: true } } };

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUser): Promise<UserModelWithPreRegister> {
    return await this.prisma.user.create({
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
