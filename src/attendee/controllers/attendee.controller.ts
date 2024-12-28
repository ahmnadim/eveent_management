import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAttendeeDto } from '../dto/attendee.dto';
import { AttendeeService } from '../services/attendee.service';
import {
  PaginationDto,
  PaginationWithSearchDto,
} from 'src/pagination/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiAttendeeCreate,
  ApiAttendeeGet,
  ApiAttendeeGetAll,
  ApiAttendeeSearch,
} from '../decorators/api.decorator';

@ApiTags('Attendees')
@Controller('attendees')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Get('/all')
  @ApiAttendeeGetAll()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.attendeeService.findAll(paginationDto);
  }

  @Post()
  @ApiAttendeeCreate()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createAttendeeDto: CreateAttendeeDto) {
    return this.attendeeService.create(createAttendeeDto);
  }

  @Get('/search')
  @ApiAttendeeSearch()
  async searchByNameOrEmail(
    @Query(ValidationPipe) query: PaginationWithSearchDto,
  ) {
    return await this.attendeeService.searchByNameOrEmail(query);
  }

  @Get('/:id')
  @ApiAttendeeGet()
  async findOne(@Param('id') id: string) {
    return this.attendeeService.findOne(id);
  }
}
