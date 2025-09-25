/* import { CanActivate, ExecutionContext, Injectable, Type,BadRequestException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Role } from "../users/dtos/User.dto";
import { JwtService } from '@nestjs/jwt';

export function RoleGuard(role: Role): Type<CanActivate>{
   @Injectable()
    class RoleGuardMixin extends JwtAuthGuard{
        constructor(
            private jwtService: JwtService
            ) {
                super();
            }

      async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        let token = request.headers["authorization"];
        if(!token) {
          throw new BadRequestException('Please pass token ')
        }
        token = token.slice(7);
        const user = this.jwtService.decode(token);
        if (user && user['role']) {
          return user['role'] === role;
        }
        return false;
      }
    }
   
    return RoleGuardMixin;
  }
   
  export default RoleGuard; */ 

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '../users/dtos/User.dto';

export function RoleGuard(requiredRole: Role): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      let token = request.headers['authorization'];

      if (!token || !token.startsWith('Bearer ')) {
        throw new BadRequestException('Missing or malformed token');
      }

      token = token.replace('Bearer ', '');
      const payload = this.jwtService.decode(token) as any;

      if (!payload || !payload.role) {
        throw new UnauthorizedException('Invalid token or missing role');
      }

      return payload.role === requiredRole;
    }
  }

  return RoleGuardMixin;
}
