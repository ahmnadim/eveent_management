import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Event } from './event.entity';
import { Registration } from './registration.entity';

@Entity('attendee')
@Unique(['email'])
export class Attendee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Registration, (registration) => registration.attendee)
  registrations: Registration[];
}
