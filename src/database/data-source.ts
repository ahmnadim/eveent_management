import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Attendee } from 'src/entity/attendee.entity';
import { Registration } from 'src/entity/registration.entity';
import { Event } from 'src/entity/event.entity';

// Create the function to get the dynamic DataSource
export const createDataSource = (configService: ConfigService): DataSource => {
  const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'), // default value if not set
    port: parseInt(configService.get<string>('DB_PORT', '5432'), 10), // default value if not set
    username: configService.get<string>('DB_USER', 'nadim'),
    password: configService.get<string>('DB_PASSWORD', 'nadim1234'),
    database: configService.get<string>('DB_NAME', 'event_management'),
    entities: [Attendee, Registration, Event],
    migrations: ['dist/db/migrations/*.js'], // Or use paths that point to compiled JS files
    synchronize: false, // It's better to disable this in production
    logging: true,
  };

  return new DataSource(dataSourceOptions);
};

export default createDataSource;
