import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AttemptDto } from 'src/entities/dto/attempt.dto';
import { EmailRequestDto } from 'src/entities/dto/email.request.dto';
import { PhishingService } from './phishing.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ObjectId } from 'mongodb';

@Controller('api/phishing')
@ApiTags('Phishing')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class PhishingController {
  constructor(
        private readonly phishingService: PhishingService,
        private readonly httpService: HttpService
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Returns all pishing attempts',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the overall pishing attempts',
    type: [AttemptDto]
  })
  @Get()
  public async getAllPhishingAttempts(): Promise<AttemptDto[]> {
    return await this.phishingService.getAllPhishingAttempts();
  }


  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send phishing email for the specified email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBody({ type: EmailRequestDto })
  @Post()
  public async sendEmail(@Body() emailDetailsDto: EmailRequestDto): Promise<any> {
    const url = `http://localhost:5058/api/email`;

    const response = await firstValueFrom(
      this.httpService.post(url, emailDetailsDto)
    );

    if (response.status === 200) {
      return { message: 'Operation successful', statusCode: 200 }; 
    } 
    
    else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  }


  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Updates the attempt status',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Get(':id')
  public async updateAttemptStatus(@Param('id') id: string): Promise<any> {
    const objectId = new ObjectId(id);

    await this.phishingService.updateAttemptStatus(objectId);

    return { message: 'Operation successful', statusCode: 201 }; 
  }

  
}