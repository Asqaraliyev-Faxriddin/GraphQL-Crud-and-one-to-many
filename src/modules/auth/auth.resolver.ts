import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './token';

@Resolver(User)
export class AuthResolver {
    constructor(private readonly authService:AuthService){}

    @Mutation(()=> AuthResponse)
    Register(@Args("payload") payload:RegisterDto){
        return this.authService.register(payload)
    }

    @Mutation(()=> AuthResponse)
    Login(@Args("payload") payload:LoginDto){
        return this.authService.login(payload)
    }
}
