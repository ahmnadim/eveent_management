import { Module } from '@nestjs/common';
import { AttendeeController } from './controllers/attendee.controller';
import { AttendeeService } from './services/attendee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from 'src/entity/attendee.entity';
import { RegistrationModule } from 'src/registration/registration.module';

@Module({
  controllers: [AttendeeController],
  imports: [TypeOrmModule.forFeature([Attendee]), RegistrationModule],
  providers: [AttendeeService],
})
export class AttendeeModule {}
