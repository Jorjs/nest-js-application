import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { PhishingRepository } from './phishing.repository';
import { UsersAttemptsEntity } from 'src/entities/user.attempts.entity';
import { HttpModule } from '@nestjs/axios';
import { EventModule } from 'src/event/event.module';
import { EventGateway } from 'src/event/event.gateway';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UsersAttemptsEntity]), HttpModule, EventModule
  ],
  controllers: [PhishingController],
  providers: [PhishingService, PhishingRepository, EventGateway],
})
export class PhishingModule {}