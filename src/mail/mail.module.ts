import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailServer } from 'src/utility/constants';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './processor/mail.processor';

@Module({
  providers: [MailService, MailProcessor],
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get(MailServer.host) ?? 'localhost', // process.env.SMTP_HOST,
            port: parseInt(configService.get(MailServer.port)) || 1025, //+process.env.SMTP_PORT,
            auth: {
              user: configService.get(MailServer.user),
              pass: configService.get(MailServer.pass),
            },
          },
          defaults: {
            from: '"No Reply" <noreply@example.com>',
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
