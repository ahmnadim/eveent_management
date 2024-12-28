import { IsInt, IsNotEmpty, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Registration } from './registration.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('date')
  @IsNotEmpty()
  date: Date;

  @Column({ nullable: true })
  location: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  max_attendees: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations: Registration[];
}
