import { Controller, Post, Body, Inject } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() credentials: any): Promise<string> {
    // Validate credentials and generate payload
    const payload = { username: credentials.username };

    // Generate and return JWT
    const token = await this.appService.signPayload(payload);
    return token + ': Iroshfgtffan';
  }
}
