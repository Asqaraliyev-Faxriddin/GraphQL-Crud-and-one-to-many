import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    let ctx = GqlExecutionContext.create(context);
    let req = ctx.getContext().req;

    let authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException("Token yo'q");

    let token = authHeader.split(' ')[1];
    try {
      let payload = this.jwtService.verify(token);
      req.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.name);
    }
  }
}
