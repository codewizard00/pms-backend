import { HttpService } from '@nestjs/axios';
import {  Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'libs/common/database/models/user.model';

@Injectable()
export class UsersService {

  constructor (
    private readonly httpService: HttpService,
    @InjectModel(User) private readonly usersModel,
    private jwtService: JwtService
  ){}

  

  async register(registerRequest) {
    const {name,email,password} = registerRequest;
    const user = await this.usersModel.findOne({where:{email}});
    if(user){
      throw new NotFoundException('User Already Exist With this Email'); 
    }else{
      const newUser = await this.usersModel.create({name,username:email.split("@")[0],email,password});
      return newUser;
    }
  }

  async verifyEmailByToken(token) {
    const user = await this.usersModel.findOne({where:token});
    if(user){
      return user;
    }else{
      throw new Error("User not found"); 
    }
  }

  async login(loginRequest) {
    const {email,password} = loginRequest;
    const user = await this.usersModel.findOne({where:{email}});
    if(user){
      if(user.password === password){
        const payload = { sub: user.id, id: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }else{
        throw new UnauthorizedException("User's Email Password Doesn't matches");
      }
    }else{
      throw new UnauthorizedException("User's Email Password Doesn't matches"); 
    }
  }

  async forgetPassword(email) {
    const user = await this.usersModel.findOne({where:email});
    if(user){
      return user;
    }else{
      throw new Error("User not found"); 
    }
  }

  async resetPassword(resetPasswordRequest) {
    const {email,password} = resetPasswordRequest;
    const user = await this.usersModel.findOne({where:email});
    if(user){
      user.password = password;
      return user;
    }else{
      throw new Error("User not found"); 
    }
  }
  
  

}
