import { UserModelProvider } from '@/mongo/user.schema';
import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, UserModelProvider],
  exports: [UserService],
})
export class UserModule {}
