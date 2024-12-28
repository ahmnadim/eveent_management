import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';

@Entity('registration')
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  attendeeId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registered_at: Date;

  @ManyToOne(() => Event, (event) => event.registrations)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => Attendee, (attendee) => attendee.registrations)
  @JoinColumn({ name: 'attendeeId' })
  attendee: Attendee;
}
