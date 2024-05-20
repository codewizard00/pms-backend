import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { registerRequestDto } from './dto/registerRequest.dto';
import { loginRequestDto } from './dto/loginRequest.dto';
import { MessagePattern } from '@nestjs/microservices';
import { CurrentUser } from './current-user';
import { AuthGuard } from '../auth/auth.gaurd';
import { User } from 'libs/common/database/models/user.model';

@Controller({
    // path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('/register')
  async register(
    @Body() registerRequest: registerRequestDto
  ){
    const data = await this.usersService.register(registerRequest);
    return {};
  }

  
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginRequest: loginRequestDto,
  ) {
    const {access_token} = await this.usersService.login(loginRequest);
    return {
      message:"Successfully Login",
      data:{
        token:access_token
      }
    };
  }

  @UseGuards(AuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
  
}
