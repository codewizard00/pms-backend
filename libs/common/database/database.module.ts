// common-database/src/common-database.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'valar@1234',
        database: 'test',
        alter: true,
        logging:true,  
        autoLoadModels: true,
        synchronize: true, // WARNING: Synchronize should be set to false in production.
      }),
    }),
  ],
  exports: [SequelizeModule],
  providers: [],
})
export class CommonDatabaseModule {}
