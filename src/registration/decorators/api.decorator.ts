import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiRegister() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register for an event',
      description: 'Registers an attendee for a specific event.',
    }),
    ApiResponse({
      status: 201,
      description: 'The registration was successful.',
      schema: {
        example: {
          attendeeId: 'a982a3e2-e0cc-4906-98b2-c84fd302b7d4',
          eventId: 'e35dea92-5ec3-4785-aea9-419ed5157a0a',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input data.',
    }),
    ApiResponse({
      status: 409,
      description:
        'Conflict: The attendee is already registered for this event.',
    }),
  );
}

export function ApiAttendeesForEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get attendees for an event',
      description: 'Retrieves a list of attendees for a specific event.',
    }),
    ApiResponse({
      status: 200,
      description: 'The attendees were successfully retrieved.',
      schema: {
        example: {
          data: {
            id: '6eb0895a-c70b-4382-99cc-909f27f0a1bc',
            name: 'test event',
            description: 'test event description...',
            date: '2024-12-29',
            location: 'dhaka, bangladesh',
            max_attendees: 100,
            created_at: '2024-12-27T15:18:00.356Z',
            registrations: [
              {
                id: '6dfb3ba4-0277-41e9-80f2-b847a4971798',
                eventId: '6eb0895a-c70b-4382-99cc-909f27f0a1bc',
                attendeeId: '44fff64d-3b25-4dc9-95a2-363414dab205',
                registered_at: '2024-12-27T15:18:12.584Z',
                attendee: {
                  id: '44fff64d-3b25-4dc9-95a2-363414dab205',
                  name: 'aryaan',
                  email: 'aryan@mail.co',
                },
              },
              {
                id: '11ce6fcc-6531-4deb-a68b-cca1f2774b74',
                eventId: '6eb0895a-c70b-4382-99cc-909f27f0a1bc',
                attendeeId: 'a982a3e2-e0cc-4906-98b2-c84fd302b7d4',
                registered_at: '2024-12-27T15:19:47.855Z',
                attendee: {
                  id: 'a982a3e2-e0cc-4906-98b2-c84fd302b7d4',
                  name: 'ayaan',
                  email: 'ayan@mail.co',
                },
              },
            ],
          },
          meta: {
            totalItems: 2,
            totalPages: 1,
            currentPage: 1,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'The event was not found.',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}
