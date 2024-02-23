import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  singIn(@Body() body: AuthDto) {
    return this.authService.signIn(body);
  }

  @Post('signup')
  singUp(@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }
}
