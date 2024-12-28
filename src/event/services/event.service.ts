import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entity/event.entity';
import { Registration } from 'src/entity/registration.entity';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { paginateResponse } from 'src/pagination/dto/pagination.helper';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
  ) {}

  async create(eventData: Partial<Event>): Promise<Event> {
    try {
      const checkOverlap = await this.eventRepository
        .createQueryBuilder('event')
        .where('DATE(event.date) = DATE(:date)', { date: eventData.date })
        .getOne();

      if (checkOverlap) {
        throw new HttpException(
          'Date overlap, try different date',
          HttpStatus.BAD_REQUEST,
        );
      }

      const event = this.eventRepository.create(eventData);

      return await this.eventRepository.save(event);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.eventRepository
      .createQueryBuilder('events')
      .limit(limit)
      .offset(skip)
      .getManyAndCount();

    return paginateResponse(data, total, page, limit);
  }

  findOne(id: string): Promise<Event> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async getAttendeesForEvent(event_id: string, paginationDto) {
    // const event = await this.eventRepository.findOne({
    //   where: { id: event_id },
    //   relations: ['registrations', 'registrations.attendee'],

    // });

    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const data: any = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.registrations', 'registration')
      .limit(limit)
      .offset(skip)
      .leftJoinAndSelect('registration.attendee', 'attendee')
      .where('event.id = :eventId', { eventId: event_id })
      .getOne();

    if (!data) {
      throw new Error('Event not found');
    }

    const totalRegistrations = await this.registrationRepository
      .createQueryBuilder('registration')
      .where('registration.eventId = :eventId', { eventId: event_id })
      .getCount();

    return paginateResponse(data, totalRegistrations, page, limit);
  }

  async filterByDate(date: string, paginationDto: PaginationDto) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException(
        'Please specify date in query param.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.eventRepository
      .createQueryBuilder('event')
      .where('DATE(event.date) = :date', {
        date: parsedDate.toISOString().split('T')[0],
      })
      .limit(limit)
      .offset(skip)
      .getManyAndCount();

    return paginateResponse(data, total, page, limit);
  }
}
