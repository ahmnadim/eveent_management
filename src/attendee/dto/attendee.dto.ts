import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendeeDto {
  @ApiProperty({
    description: 'The name of the attendee',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the attendee',
    example: 'johndue@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateAttendeeDto extends PartialType(CreateAttendeeDto) {
  @IsString()
  id: string;
}
