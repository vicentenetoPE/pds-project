import { Body, Controller, ExecutionContext, Headers, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sing-in.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private authService: AuthService, private userService: UsersService){}  

  @Post('signin')
  @HttpCode(200)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  signIn(@Body() signInDto: SignInDto): Promise<{access_token: string}> {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @HttpCode(201)
  @Post('signup')
  async create(@Body() params: User){
    const res = await this.userService.create(params)
    return res;
  }

  @HttpCode(200)
  @Post('validatetoken')
  async validateToken(@Headers('Authorization') authHeader?: string, @Body() params?: {access_token:string}) {
    let token ="";
    if(params.access_token){
      token = params.access_token;
    }
    if(!token && authHeader){
      token= authHeader;
    }
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    const res = await this.authService.validateToken(token);
    return res
  }
}