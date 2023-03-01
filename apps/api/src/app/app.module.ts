import { Logger, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyData, MySchema } from './schema';

export const DEFAULT_DB_NAME = 'api';
const mongoDBURI =
  process.env.MONGODB_URI || `mongodb://localhost:27017/${DEFAULT_DB_NAME}`;
Logger.log(`Using MongoDB URI ${mongoDBURI}`);

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        dbName: DEFAULT_DB_NAME,
        uri:
          process.env.MONGODB_URI ||
          'mongodb://localhost:27017/' + DEFAULT_DB_NAME,
        autoIndex: false,
      }),
    }),
    MongooseModule.forFeature([
      {
        name: MyData.name,
        schema: MySchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
