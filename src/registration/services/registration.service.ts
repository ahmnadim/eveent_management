import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from 'src/entity/attendee.entity';
import { Event } from 'src/entity/event.entity';
import { Registration } from 'src/entity/registration.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/registration.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JobNames } from 'src/utility/constants';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Registration)
    private readonly registerRepository: Repository<Registration>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
    private readonly mailService: MailService,
  ) {}

  async register(data: RegisterDto) {
    try {
      //check max attendees
      const event = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.registrations', 'registration')
        .leftJoinAndSelect('registration.attendee', 'attendee')
        .select('max_attendees')
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(attendee.id)', 'attendeeCount')
            .from('registration', 'registration')
            .leftJoin('registration.attendee', 'attendee')
            .where('registration.eventId = :eventId', {
              eventId: data.eventId,
            });
        }, 'attendeeCount')
        .where('event.id = :eventId', { eventId: data.eventId })
        .getRawOne();
      if (+event.attendeeCount + 1 > +event.max_attendees) {
        throw new HttpException(
          'Attendees are full.',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const isRegister = await this.registerRepository.findOne({
        where: {
          attendeeId: data.attendeeId,
          eventId: data.eventId,
        },
      });
      if (isRegister) {
        throw new HttpException(
          'Conflict: The attendee is already registered for this event.',
          HttpStatus.CONFLICT,
        );
      }

      const attendeeDetails = await this.attendeeRepository.findOne({
        where: {
          id: data.attendeeId,
        },
      });
      if (!attendeeDetails) {
        throw new HttpException('Attendee not found.', HttpStatus.NOT_FOUND);
      }

      const eventDetails = await this.eventRepository.findOne({
        where: {
          id: data.eventId,
        },
      });

      if (!event) {
        throw new HttpException('Event not found.', HttpStatus.NOT_FOUND);
      }

      const registerRepo = this.registerRepository.create(data);
      const res = await this.registerRepository.save(registerRepo);
      //send mail....

      this.mailService.addToQueueForConfirmationMail({
        eventDetails,
        attendeeDetails,
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}
