import { Module } from '@nestjs/common';
import { RegistrationController } from './controllers/registration.controller';
import { RegistrationService } from './services/registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from 'src/entity/registration.entity';
import { Event } from 'src/entity/event.entity';
import { Attendee } from 'src/entity/attendee.entity';
import { EventModule } from 'src/event/event.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Registration, Event, Attendee]),
    EventModule,
    MailModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
