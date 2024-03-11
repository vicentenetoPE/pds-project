import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){

  }  
  //Todo tirar o record string any e trocar por um dto
  @HttpCode(HttpStatus.OK)
  @Post('entrar')
  signIn(@Body() signInDto: Record<string, any>): Promise<{access_token: string}> {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Post('cadastrar')
  create(): Promise<void> {
    return Promise.resolve();
  }
}