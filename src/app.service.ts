import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './entity/attendee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}
  async getHello() {
    const a = await this.attendeeRepository.findOneBy({
      email: 'andim@mail.com',
    });
    console.log('attendee: ', a, this.attendeeRepository);

    if (a) {
      return { message: 'Try another one.', data: a };
    }

    const att = this.attendeeRepository.create({
      email: 'andim@mail.com',
      name: 'nadim',
    });
    return await this.attendeeRepository.save(att);
  }

  async setHello(body) {
    console.log('body: ', body);
    const att = this.attendeeRepository.create(body);
    return await this.attendeeRepository.save(att);
  }
}
