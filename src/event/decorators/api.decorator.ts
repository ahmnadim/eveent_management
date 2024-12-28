import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateEventDto } from '../dto/event.dto';
import { Event } from 'src/entity/event.entity';

export function ApiEventCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new event',
      description: 'Create a new event',
    }),
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      schema: {
        example: {
          id: 'e35dea92-5ec3-4785-aea9-419ed5157a0a',
          name: 'Event Name',
          description: 'Event Description',
          date: '2021-12-31T23:59:59.999Z',
          location: 'Event Location',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input data.',
    }),

    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
    //bad request
    ApiBadRequestResponse({ description: 'Date overlap, try different date' }),
  );
}

export function ApiGetAllEvents() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all events',
      description: 'Get all events',
    }),

    ApiResponse({
      status: 200,
      description: 'The records have been successfully retrieved.',
      schema: {
        example: [
          {
            id: 'e35dea92-5ec3-4785-aea9-419ed5157a0a',
            name: 'Event Name',
            description: 'Event Description',
            date: '2021-12-31T23:59:59.999Z',
            location: 'Event Location',
          },
        ],
      },
    }),

    ApiResponse({
      status: 404,
      description: 'No records found.',
    }),

    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
  );
}

export function ApiEventsFilterByDate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Filter events by date',
      description: 'Filter events by date',
    }),

    ApiResponse({
      status: 200,
      description: 'The records have been successfully retrieved.',
      schema: {
        example: [
          {
            id: 'e35dea92-5ec3-4785-aea9-419ed5157a0a',
            name: 'Event Name',
            description: 'Event Description',
            date: '2021-12-31T23:59:59.999Z',
            location: 'Event Location',
          },
        ],
      },
    }),

    ApiResponse({
      status: 404,
      description: 'No records found.',
    }),

    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
  );
}

export function ApiGetEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get an event by id',
      description: 'Get an event by id',
    }),

    ApiResponse({
      status: 200,
      description: 'The record has been successfully retrieved.',
      schema: {
        example: {
          id: 'e35dea92-5ec3-4785-aea9-419ed5157a0a',
          name: 'Event Name',
          description: 'Event Description',
          date: '2021-12-31T23:59:59.999Z',
          location: 'Event Location',
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: 'No records found.',
    }),

    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
  );
}
