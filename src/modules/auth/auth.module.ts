import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt-token';

@Global()
@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  providers: [AuthService, AuthResolver],
  exports: [JwtModule]
})
export class AuthModule {}
