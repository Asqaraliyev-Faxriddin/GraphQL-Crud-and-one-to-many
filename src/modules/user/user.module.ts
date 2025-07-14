import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  providers: [UserService,UserResolver,AuthGuard]
})
export class UserModule {}
