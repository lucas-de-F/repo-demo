import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreatePreRegisterDto } from './dto/create-pre-register.dto';
import { UpdatePreRegisterDto } from './dto/update-pre-register.dto';
import { PreRegisterRepository } from './user.repository';

@Injectable()
export class PreRegisterService {
  constructor(private preRegisterRepository: PreRegisterRepository) {}
  async savePreRegister(createPreRegisterDto: CreatePreRegisterDto) {
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
  update(updatePreRegisterDto: UpdatePreRegisterDto) {
    return this.preRegisterRepository.update(updatePreRegisterDto);
  }

  async remove(id: string) {
    const deletedUser = await this.preRegisterRepository.delete(id);

    return deletedUser;
  }
}
