import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  isString,
  Min,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
  })
  @Transform((value) => {
    return value.value ? +value.value : 1;
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    required: false,
  })
  @Transform((value) => {
    return value.value ? +value.value : 10;
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class PaginationWithSearchDto extends PaginationDto {
  @ApiProperty({
    description: 'text to search.',
    example: 'name or email',
    required: true,
  })
  @IsNotEmpty({
    message: 'Enter what do you want to find, in the query param.',
  })
  @IsString()
  by: string;
}

export class PaginationWithDateDto extends PaginationDto {
  @ApiProperty({
    description: 'Date to filter.',
    example: '2024-12-30',
    required: true,
  })
  @IsNotEmpty({
    message: 'Enter the date to filter, in the query param.',
  })
  @IsString()
  date: string;
}
