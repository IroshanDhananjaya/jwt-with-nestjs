import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Optional: token expiration time
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
