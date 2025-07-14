import {JwtSignOptions } from "@nestjs/jwt";

export const JwtAccesToken:JwtSignOptions = {
    secret:"dssssssd",
    expiresIn:"40m"
}

export const JwtRefreshToken:JwtSignOptions = {
    secret:"vggvbvbh",
    expiresIn:"20m"
}


