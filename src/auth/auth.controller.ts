import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentias.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.singUp(authCredentialsDto);
  }

  @Post('/signin')
  singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.singIn(authCredentialsDto);
  }
}
