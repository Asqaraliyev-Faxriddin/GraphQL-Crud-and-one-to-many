import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAccesToken, JwtRefreshToken } from 'src/common/config/jwt-token';
import { Token } from 'src/common/types/user';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private prisma:PrismaService,
        private jwtService:JwtService

    ){}

    private generate(payload:Token,jwtTokenstatus?:false){

        let accesToken =  this.jwtService.sign(payload,JwtAccesToken)
        let refreshToken = this.jwtService.sign(payload,JwtRefreshToken)

        if(jwtTokenstatus){
            return accesToken
        }else{
            return{
                accesToken,
                refreshToken
            }
        }
    }


    async EmailAndUsername(username:string,email:string,tokenStatus?:false){

        let oldEmail = await this.prisma.user.findUnique({where:{email}})
        let oldUsername = await this.prisma.user.findUnique({where:{username}})


        if(oldUsername) throw new ConflictException("this is username already exist")
        if(oldEmail) throw new ConflictException("this is email already exist")


        return true

    }


    async register(payload:RegisterDto){
        let {username,email,age,password} = payload
        let Hashpassword = await bcrypt.hash(password,10)
       
        await this.EmailAndUsername(username,email)

        let data = await this.prisma.user.create({data:{...payload,password:Hashpassword}})
        let tokens = await this.generate({id:data.id,role:data.role})
        return tokens
    }




 


    async login(payload:LoginDto){
        let {username,password} = payload
        let oldUsername = await this.prisma.user.findUnique({where:{username}})
        if(!oldUsername) throw new ConflictException("this is username already exist")


        let Hashpassword = await bcrypt.compare(password,oldUsername.password)           
        if(!Hashpassword) throw new ConflictException("username or password incorrect")


        let tokens = await this.generate({id:oldUsername.id,role:oldUsername.role})
        return tokens
    }
}
