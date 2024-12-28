import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RegistrationService } from '../services/registration.service';
import { RegisterDto } from '../dto/registration.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiAttendeesForEvent, ApiRegister } from '../decorators/api.decorator';
import { EventService } from 'src/event/services/event.service';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';

@ApiTags('Registration')
@Controller('register')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @ApiRegister()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) register: RegisterDto) {
    return await this.registrationService.register(register);
  }

  @Get('/attendees/:eventId')
  @ApiAttendeesForEvent()
  async getAttendeesForEvent(
    @Param('eventId') eventId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.eventService.getAttendeesForEvent(eventId, paginationDto);
  }
}
