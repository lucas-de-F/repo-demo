import { Injectable } from '@nestjs/common';
import { PreRegisterRepository } from './user.repository';
import { UpdatePreRegisterResponse } from './dto/serviceDto/pre-register.dto';
import { CreatePreRegister } from './dto/modelDto/pre-register.dto';

@Injectable()
export class PreRegisterService {
  constructor(private preRegisterRepository: PreRegisterRepository) {}

  async savePreRegister(createPreRegisterDto: CreatePreRegister) {
    const preRegister = await this.preRegisterRepository.create(
      createPreRegisterDto,
    );

    return preRegister;
  }

  findAll() {
    return this.preRegisterRepository.findAll();
  }

  findOne(id: string) {
    return this.preRegisterRepository.findById(id);
  }
  findOneByEmail(email: string) {
    return this.preRegisterRepository.findOneByEmail(email);
  }
  update(updatePreRegisterDto: UpdatePreRegisterResponse) {
    return this.preRegisterRepository.update(updatePreRegisterDto);
  }

  async remove(id: string) {
    const deletedUser = await this.preRegisterRepository.delete(id);

    return deletedUser;
  }
}
