import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { UserRole } from 'src/enums/user-role.enum';
import { UserData } from 'src/interfaces/user.interface';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        'roles',
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredRoles || requiredRoles.length === 0) return true;
  
      const request = context.switchToHttp().getRequest();
      const user: UserData = request.user;
  
      if (!user) return false;
  
      const hasRole = requiredRoles.includes(user.role);
      if (!hasRole) {
        throw new ForbiddenException(
          `Access denied: You need ${requiredRoles.join(', ')} role`,
        );
      }
  
      return true;
    }
  }