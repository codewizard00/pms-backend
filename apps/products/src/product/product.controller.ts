import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'libs/common/auth/jwt.gaurd';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() request: any,@Body() createProductDto: CreateProductDto) {
    const data = await this.productService.create(createProductDto,request.user.id);
    return {
      message:"Product Created Successfully",
      data:data,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: any) {
    const products = await this.productService.findAll(request.user.id);
    return {
      message:"Product List Fetched Successfully",
      data : products
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string , @Req() request: any) {
    const data = await this.productService.findOne(+id, request.user.id);
    return {
      message:"Product Fetched Successfully",
      data:data,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto , @Req() request: any) {
    const data = await this.productService.update(+id, updateProductDto ,request.user.id);
    return {
      message:"Product Updated Successfully",
      data:data
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,@Req() request: any) {
    const data =await this.productService.remove(+id,request.body.id);
    return {
      message:"Product Deleted Successfully",
      data:data
    }
  }
}
