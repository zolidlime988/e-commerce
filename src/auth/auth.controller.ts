import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { Login } from './models/auth.dto';
import { AuthService } from './auth.service';
import { RegisterUser } from 'src/user/models/user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: Login) {
    const foundUser = await this.authService.login(body);
    if (foundUser) {
      return foundUser
    }
    throw new UnauthorizedException()
  }

  @Post('/register')
  async register(@Body() body: RegisterUser) {
    return await this.authService.register(body);
  }
}
