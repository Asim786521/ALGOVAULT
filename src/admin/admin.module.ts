// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/user.module';
 
@Module({
  imports: [
    AuthModule, 
    UsersModule, // Include UsersModule to access user-related services
  ],
  providers: [AdminService],  // Admin-related services
  controllers: [AdminController],  // Admin controller
  exports: [AdminService],  // Export AdminService if needed in other modules
})
export class AdminModule {}
