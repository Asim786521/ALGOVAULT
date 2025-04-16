// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
 
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/utils/hashing.utils';
import { RegisterDto } from './dto/register.dto';
 

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  
  ) {}

  async signup(dto: RegisterDto) {
    const hashedPassword = await hashPassword(dto.password); // Hash password using the utility
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role:dto.role
      },
    });
    console.log('Saving user with role:', dto.role);

    return this.signToken(user.id, user.email, user.role);
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await comparePassword(dto.password, user.password))) { // Compare password using the utility
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.id, user.email, user.role);
  }

   signToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
