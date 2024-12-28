import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Attendee } from './entity/attendee.entity';
import { Event } from './entity/event.entity';
import { Registration } from './entity/registration.entity';
import { EventModule } from './event/event.module';
import { AttendeeModule } from './attendee/attendee.module';
import { RegistrationModule } from './registration/registration.module';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './mail/mail.module';
import { BullConfig, DatebaseConfig } from './utility/constants';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        console.log('path: ', path.join(process.cwd(), 'src/mail/templates'));

        return {
          type: 'postgres',
          host: configService.get(DatebaseConfig.host),
          port: +configService.get(DatebaseConfig.port),
          username: configService.get(DatebaseConfig.username),
          password: configService.get(DatebaseConfig.password),
          database: configService.get(DatebaseConfig.name),
          entities: [Attendee, Event, Registration],
          synchronize: true,
          autoLoadEntities: true,
        };
      },

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configSercvice: ConfigService) => {
        return {
          redis: {
            host: configSercvice.get(BullConfig.redisHost), // Replace with your Redis host
            port: configSercvice.get(BullConfig.redisPort), // Replace with your Redis port
          },
        };
      },
    }),
    // BullModule.registerQueue({
    //   name: 'mail-queue',
    // }),
    MailModule,
    TypeOrmModule.forFeature([Attendee]),
    EventModule,
    AttendeeModule,
    RegistrationModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
