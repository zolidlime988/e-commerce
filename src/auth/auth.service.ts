import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { Login } from './models/auth.dto';
import { RegisterUser } from 'src/user/models/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async register(user: RegisterUser) {
    const salt = await genSalt();
    const hashedPassword = await hash(user.password, salt)
    user.password = hashedPassword;
    const { user_id, username, register_date } = await this.userService.save(user);
    return { user_id, username, register_date }
  }

  async login(user: Login) {
    const foundUser = await this.userService.findUserByUsername(user.username);

    if (foundUser) {
      if (await compare(user.password, foundUser.password)) {
        const payload = {
          username: foundUser.username,
          user_id: foundUser.user_id
        }

        const access_token = await this.jwtService.signAsync(payload);
        return { access_token }
      }
    }
    return false;
  }

}
