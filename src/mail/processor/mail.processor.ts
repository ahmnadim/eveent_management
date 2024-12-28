import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import * as path from 'path';
import { JobNames } from 'src/utility/constants';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process(JobNames.SEND_CONFIRMATION_EMAIL)
  async sendEmail(job: any) {
    const { to, from, subject, template, context } = job.data;

    await this.mailService.sendMail({
      to,
      from,
      subject: subject,
      template: path.join(process.cwd(), 'src/mail/templates/confirmation'), // `.hbs` extension is appended automatically
      context,
    });
  }
}
