import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entity/event.entity';
import { Registration } from 'src/entity/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Registration])],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
