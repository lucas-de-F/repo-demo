import { Injectable } from '@nestjs/common';
import { Role } from './Dto/modelDto/role-model.dto';
import { PrismaService } from '../../infra/prisma/prisma.service';

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
