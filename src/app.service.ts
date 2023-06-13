/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService,
    
  ) {}

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
