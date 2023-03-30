import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}
  async getRoles() {
    return await this.roleRepository.getAll();
  }

  async getRoleById(id: string) {
    return await this.roleRepository.getById(id);
  }
}
