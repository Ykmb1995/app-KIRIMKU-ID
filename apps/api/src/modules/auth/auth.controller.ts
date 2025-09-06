import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    // Disable this endpoint in production
    if (process.env.NODE_ENV === 'production') {
      throw new BadRequestException('Dev login is disabled in production');
    }
    return this.authService.login(body.email, body.password);
  }
}
