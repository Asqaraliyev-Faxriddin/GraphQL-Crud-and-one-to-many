import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    
    let roles = this.reflector.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    
    if (!roles) return true;

    let ctx = GqlExecutionContext.create(context);
    let user = ctx.getContext().req.user;


    // @ts-ignore
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException();
    }

  
    return true;
  }

}
