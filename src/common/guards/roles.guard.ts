// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../constants/roles.constant';
import { ROLES_KEY } from '../decorator/role.decorator';
 
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
  
    const { user } = context.switchToHttp().getRequest();
  
    // If roles are stored as a string instead of an array, handle it here
    const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];
    
    return requiredRoles.some((role) => userRoles.includes(role));
  }
  
}
