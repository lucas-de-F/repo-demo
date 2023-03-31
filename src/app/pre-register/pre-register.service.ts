import { Injectable } from '@nestjs/common';
import { PreRegisterRepository } from './user.repository';
import { PreRegisterResponse } from './dto/serviceDto/pre-register.dto';
import { CreatePreRegister } from './dto/modelDto/pre-register.dto';

@Injectable()
export class PreRegisterService {
  constructor(private preRegisterRepository: PreRegisterRepository) {}

  savePreRegister(createPreRegisterDto: CreatePreRegister) {
    return this.preRegisterRepository.create(createPreRegisterDto);
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
  update(updatePreRegisterDto: PreRegisterResponse) {
    return this.preRegisterRepository.update(updatePreRegisterDto);
  }
  remove(id: string) {
    return this.preRegisterRepository.delete(id);
  }
}
