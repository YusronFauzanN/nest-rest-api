import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  singIn() {
    return this.authService.signIn();
  }

  @Get('signup')
  singUp(@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }
}
