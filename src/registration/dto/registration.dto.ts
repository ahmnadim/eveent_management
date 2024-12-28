import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'ID of the event being registered for',
    example: 'e35dea92-5ec3-4785-aea9-419ed5157a0a',
  })
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @ApiProperty({
    description: 'ID of the attendee registering for the event',
    example: 'a982a3e2-e0cc-4906-98b2-c84fd302b7d4',
  })
  @IsNotEmpty()
  @IsString()
  attendeeId: string;
}
