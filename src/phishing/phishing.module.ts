import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { PhishingRepository } from './phishing.repository';
import { UsersAttemptsEntity } from 'src/entities/user.attempts.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UsersAttemptsEntity]), HttpModule,
  ],
  controllers: [PhishingController],
  providers: [PhishingService, PhishingRepository],
})
export class PhishingModule {}