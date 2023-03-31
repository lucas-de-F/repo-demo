import { Body, Controller, UnauthorizedException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { BypassAuth } from 'src/auth/auth-service/guards/jwtGuard.service';
@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @BypassAuth()
  @Post()
  async Login(@Body() body: CreateLoginDto) {
    try {
      const token = await this.loginService.checkPass(body);
      return token;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
