// src/event/dto/create-event.dto.ts
import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'The name of the event.',
    type: String,
    example: 'Event Name',
    required: true,
  })
  @IsNotEmpty({ message: 'name cannot be empty.' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the event.',
    type: String,
    example: 'Event Description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The date of the event.',
    type: Date,
    example: '2021-12-31T23:59:59.999Z',
    required: true,
  })
  @IsNotEmpty({ message: 'date cannot be empty.' })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'The location of the event.',
    type: String,
    example: 'Event Location',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'The maximum number of attendees for the event.',
    type: Number,
    example: 100,
    required: true,
  })
  @IsNotEmpty({ message: 'max_attendees cannot be empty.' })
  @IsInt()
  @Min(1, { message: 'max_attendees must be a positive integer.' })
  max_attendees: number;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString()
  id: string;
}
