import { Injectable, NotFoundException } from '@nestjs/common';
import { AttemptDto } from 'src/entities/dto/attempt.dto';
import { PhishingRepository } from './phishing.repository';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';


@Injectable()
export class PhishingService {
  constructor ( 
    private phishingRepository: PhishingRepository, 
  ) {}

    public async getAllPhishingAttempts(): Promise<AttemptDto[]> {
      const attempts = await this.phishingRepository.getAll();

      if(attempts.length == 0) {
        throw new NotFoundException('Attempts not found');
      }

      return plainToInstance(AttemptDto, attempts);
    }

    public async updateAttemptStatus(id: ObjectId): Promise<any> {
      const attempts = await this.phishingRepository.updateStatus(id);

      if(attempts.affected == 0) {
        throw new NotFoundException('Attempt not found');
      }

      return; 
    }
}
