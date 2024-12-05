import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  singIn(@Body() singInBody: SingInDto) {
    const { username, password } = singInBody;
    return this.authService.singIn(username, password);
  }
}
