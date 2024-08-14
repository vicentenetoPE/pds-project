import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto{

    @IsNotEmpty()
    password:string;

    @IsEmail()
    email:string;
}