
import { IsString } from "class-validator"

export class loginRequestDto {

    @IsString()
    email: string

    @IsString()
    password: string

 }