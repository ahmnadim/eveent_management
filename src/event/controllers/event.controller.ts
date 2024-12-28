import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { Event } from 'src/entity/event.entity';
import {
  PaginationDto,
  PaginationWithDateDto,
} from 'src/pagination/dto/pagination.dto';
import {
  ApiEventCreate,
  ApiEventsFilterByDate,
  ApiGetAllEvents,
  ApiGetEvent,
} from '../decorators/api.decorator';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiEventCreate()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventService.create(createEventDto);
  }

  @Get('/all')
  @ApiGetAllEvents()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.eventService.findAll(paginationDto);
  }

  @Get('/filter-by-date')
  @ApiEventsFilterByDate()
  async filterEventsByDate(@Query() query: PaginationWithDateDto) {
    const date = query.date;
    const paginationDto: PaginationDto = {
      page: query.page,
      limit: query.limit,
    };
    return await this.eventService.filterByDate(date, paginationDto);
  }

  @Get(':id')
  @ApiGetEvent()
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }
}
