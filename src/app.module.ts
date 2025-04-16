import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule,  
    AuthModule,
    UsersModule,AdminModule],
})
export class AppModule {}
