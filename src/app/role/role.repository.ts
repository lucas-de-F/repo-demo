import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from './Dto/modelDto/role-model.dto';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async getById(id: string): Promise<Role> {
    return await this.prisma.role.findFirst({ where: { id } });
  }
}
