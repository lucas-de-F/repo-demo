import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PreRegisterService } from '../pre-register/pre-register.service';
import {
  CreateUser,
  LoginUserDto,
  User,
  UserWithPreRegister,
} from './dto/serviceDto/user-service.dto';
import {
  CreateUserResponse,
  UserWithPreRegisterResponse,
} from './dto/serviceDto/user-service-response.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private preRegisterService: PreRegisterService,
  ) {}
  /** 
    Busca pré registro, e retorna UserResponse
    @param createUserDto: RequestUpdateUserDto
  */
  async saveUser({
    password,
    email,
  }: LoginUserDto): Promise<CreateUserResponse> {
    //  Acha Pre-Registro de usuário
    const { name, id } = await this.preRegisterService.findOneByEmail(email);
    //cria uma nova instancia de usuário
    const findedUser: CreateUser = new CreateUser(name, email, password, id);
    const user: UserWithPreRegister = await this.userRepository.create(
      findedUser,
    );
    //cria uma nova instancia de usuário
    const userResponse = new CreateUserResponse(user);
    return userResponse;
  }

  async findOneByEmail(email: string): Promise<UserWithPreRegisterResponse> {
    const user = await this.userRepository.findOneByEmail(email);

    return user;
  }

  /**
   * @param UserResponse
   * @returns Usada apenas para setar o last_access
   */
  async update(UserResponse: User): Promise<UserWithPreRegisterResponse> {
    const user = await this.userRepository.update(UserResponse);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
