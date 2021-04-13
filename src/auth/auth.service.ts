import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentias.dto';
import { JwtPayload } from './jwt-payload-interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.singUp(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentias');
    }
    //Aplica la interface que esta en el jwt-payload-interface.ts
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
