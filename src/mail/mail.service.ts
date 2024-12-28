import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { JobNames } from 'src/utility/constants';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('mail-queue') private mailQueue: Queue,
  ) {}

  addToQueueForConfirmationMail({ eventDetails, attendeeDetails }) {
    console.log('Sending confirmation mail...', eventDetails, attendeeDetails);

    this.mailQueue.add(JobNames.SEND_CONFIRMATION_EMAIL, {
      to: attendeeDetails.email,
      from: 'support@example.com', // override default from
      subject: 'Registration confirmed.',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        name: attendeeDetails.name,
        event: eventDetails.name,
        location: eventDetails.location,
        description: eventDetails.description,
      },
    });
  }
}
