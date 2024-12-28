import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from 'src/entity/attendee.entity';
import {
  PaginationDto,
  PaginationWithSearchDto,
} from 'src/pagination/dto/pagination.dto';
import { paginateResponse } from 'src/pagination/dto/pagination.helper';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeeService {
  constructor(
    @InjectRepository(Attendee)
    private attendeeRepository: Repository<Attendee>,
  ) {}

  async create(attendeeData: Partial<Attendee>): Promise<Attendee> {
    try {
      const existingAttendee = await this.attendeeRepository.findOne({
        where: { email: attendeeData.email },
      });
      if (existingAttendee) {
        throw new HttpException(
          'Email already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const attendee = this.attendeeRepository.create(attendeeData);
      return this.attendeeRepository.save(attendee);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    if (!paginationDto.page) {
      try {
        return await this.attendeeRepository.find();
      } catch (error) {
        throw error;
      }
    }

    const { page, limit = 10 } = paginationDto;

    // Calculate skip and take
    const skip = (page - 1) * limit;
    try {
      const [data, total] = await this.attendeeRepository.findAndCount({
        skip,
        take: limit,
      });

      return paginateResponse(data, total, page, limit);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    return this.attendeeRepository.findOne({ where: { id } });
  }

  async searchByNameOrEmail(query: PaginationWithSearchDto) {
    const { by, limit = 10, page } = query;
    const skip = (page - 1) * limit;

    try {
      if (!page) {
        return await this.attendeeRepository
          .createQueryBuilder('attendee')
          .where('attendee.name LIKE :by', { by: `%${by}%` })
          .orWhere('attendee.email LIKE :by', { by: `%${by}%` })
          .getMany();
      }

      const query = this.attendeeRepository
        .createQueryBuilder('attendee')
        .where('attendee.name LIKE :by', { by: `%${by}%` })
        .orWhere('attendee.email LIKE :by', { by: `%${by}%` });

      const [data, total] = await query
        .skip(skip)
        .limit(limit)
        .getManyAndCount();
      return paginateResponse(data, total, page, limit);
    } catch (error) {
      throw error;
    }
  }
}
