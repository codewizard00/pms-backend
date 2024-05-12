import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'libs/common/auth/auth.module';
import { RmqModule, RmqService } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonDatabaseModule } from 'libs/common/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'libs/common/database/models/product.model';
import { ProductImage } from 'libs/common/database/models/product_image.model';
import { ProductSize } from 'libs/common/database/models/product_size.model';

@Module({
  imports:[
    AuthModule,
    RmqModule,
    ConfigModule.forRoot({isGlobal:true}),
    CommonDatabaseModule,
    SequelizeModule.forFeature([
      Product,
      ProductImage,
      ProductSize
    ]),

  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
