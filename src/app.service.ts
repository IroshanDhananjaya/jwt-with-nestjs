/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
