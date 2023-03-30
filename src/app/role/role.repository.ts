import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.role.findMany();
  }

  async getById(id: string) {
    return await this.prisma.role.findFirst({ where: { id } });
  }
}
