import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
 
import { AuthService } from 'src/auth/auth.service'; // if needed
import { RolesGuard } from 'src/common/guards/roles.guard';  
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [JwtModule.register({})],  // If you're using JWT-based authentication
  providers: [UsersService, PrismaService, AuthService, RolesGuard],
  controllers: [UsersController],
  exports: [UsersService], // This will allow other modules to use UsersService
})
export class UsersModule {}
