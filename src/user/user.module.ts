import {Body, Get, Module, Param, Post} from '@nestjs/common';
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {AuthService} from '../logical/auth/auth.service';

@Module({
  //controllers: [UserController],
  providers: [UserService],
  //imports:[AuthService],
  exports:[UserService],
})
export class UserModule {}
