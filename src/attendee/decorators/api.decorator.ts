import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function ApiAttendeeGetAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all attendees.',
      description: 'Get all attendees using pagination',
    }),
    ApiQuery({
      name: 'page',
      description: 'Page number for pagination',
      required: false,
      type: Number,
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      description: 'Number of records per page',
      required: false,
      type: Number,
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'List of attendees with pagination',
      schema: {
        example: {
          data: [
            {
              id: '44fff64d-3b25-4dc9-95a2-363414dab205',
              name: 'Aryaan',
              email: 'aryaan@mail.com',
            },
            {
              id: 'a982a3e2-e0cc-4906-98b2-c84fd302b7d4',
              name: 'Ayaan',
              email: 'ayaan@mail.com',
            },
          ],
          meta: {
            totalItems: 20,
            totalPages: 2,
            currentPage: 1,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid query parameters',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}

export function ApiAttendeeCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Attendee.',
      description: 'Create Attendee.',
    }),
    ApiResponse({
      description: 'Attendee data',
      schema: {
        example: {
          name: 'Aryaan',
          email: 'arian@mail.com',
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Attendee was created successfully.',
      schema: {
        example: {
          id: '44fff64d-3b25-4dc9-95a2-363414dab205',
          name: 'Aryaan',
          email: 'aryaan@mail.com',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}

export function ApiAttendeeSearch() {
  return applyDecorators(
    ApiOperation({
      summary: 'Search Attendee.',
      description: 'Search Attendee by name or email.',
    }),

    ApiResponse({
      status: 200,
      description: 'List of attendees with pagination',
      schema: {
        example: {
          data: [
            {
              id: '44fff64d-3b25-4dc9-95a2-363414dab205',
              name: 'Aryaan',
              email: 'arian@gmail.com',
            },
          ],
          meta: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 1,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid query parameters',
    }),

    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}

export function ApiAttendeeGet() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Attendee.',
      description: 'Get Attendee by id.',
    }),
    ApiResponse({
      status: 200,
      description: 'Attendee data',
      schema: {
        example: {
          id: '44fff64d-3b25-4dc9-95a2-363414dab205',
          name: 'Aryaan',
          email: 'arian@gmail.com',
        },
      },
    }),
  );
}
