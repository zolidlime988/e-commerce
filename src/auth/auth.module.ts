import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IsNotInUsedRule } from 'src/utils/validators/IsNotInUsed';
import { JwtModule } from '@nestjs/jwt';
import { constants } from 'src/constants';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: constants.jwtSecret,
      signOptions: {
        expiresIn: '60m'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, IsNotInUsedRule],
})
export class AuthModule {}
