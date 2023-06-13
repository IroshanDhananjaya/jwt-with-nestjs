import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AppController {
  constructor(
    @Inject(AppService) private readonly appService: AppService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const payload = { username: user.name };
    const token = await this.appService.signPayload(payload);

    return token + ': Iroshfgtffan';
  }

  // @Post('login')
  // async login(@Body() credentials: any): Promise<string> {
  //   // Validate credentials and generate payload
  //   const payload = { username: credentials.username };

  //   // Generate and return JWT
  //   const token = await this.appService.signPayload(payload);
  //   return token + ': Iroshfgtffan';
  // }
}
