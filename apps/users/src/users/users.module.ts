import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { RmqModule } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonDatabaseModule } from 'libs/common/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'libs/common/database/models/user.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      }),
    RmqModule,
    SequelizeModule.forFeature([User]),
    CommonDatabaseModule,
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join('apps', 'proto/notification.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
})
export class UsersModule {}
