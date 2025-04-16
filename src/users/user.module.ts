import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
 
import { AuthService } from 'src/auth/auth.service'; // if needed
import { RolesGuard } from 'src/common/guards/roles.guard';  
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule], 
  providers: [UsersService, PrismaService, AuthService, RolesGuard],
  controllers: [UsersController],
  exports: [UsersService],  
})
export class UsersModule {}
