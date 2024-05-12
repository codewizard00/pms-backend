import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'libs/common/database/models/product.model';
import { ProductImage } from 'libs/common/database/models/product_image.model';
import { ProductSize } from 'libs/common/database/models/product_size.model';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product) private readonly productModel,
    @InjectModel(ProductImage) private readonly productImageModel,
    @InjectModel(ProductSize) private readonly productSizeModel,
  ) {}

  async create(createProductDto: CreateProductDto,seller_id:number) {
    const {
      name,
      description,
      product_selling_price,
      product_mrp,
      terms_and_conditions,
      product_brand,
      category,
      product_images
    } =  createProductDto;
    const product = await this.productModel.create({
      name,
      description,
      product_brand,
      product_selling_price,
      product_mrp,
      terms_and_conditions,
      category,
      seller_id
    });
    return product;
  }

  async findAll(seller_id) {
    const products = await this.productModel.findAll({ where: { seller_id: `${seller_id}` } });
    return products;
  }

  async findOne(id: number,seller_id:number) {
    const product =await this.productModel.findOne({
      where: { id ,seller_id: `${seller_id}` },
    })
    if(!product){
      return "Product Not Found"
      // throw new NotFoundException('Product Not Found');
    }
    return product;
  }

  async update(id: number, updateProductDto: any ,seller_id:number) {
    const product =await this.productModel.findOne({
      where: { id ,seller_id: `${seller_id}`},
    })
    if(!product){ 
      return "Product Not Found"
    }else {
      const {
        name,
        description,
        product_selling_price,
        product_mrp,
        terms_and_conditions,
        product_brand,
        category,
        product_images
      } = updateProductDto;
      product.name = name || product.name;
      product.description = description || product.description;
      product.product_selling_price = product_selling_price || product.product_selling_price;
      product.product_mrp = product_mrp || product.product_mrp;
      product.product_brand = product_brand || product.product_brand;
      product.terms_and_conditions = terms_and_conditions || product.terms_and_conditions;
      product.category = category || product.category;
      await product.save();
      return product;
    }
  }

  async remove(id: number,seller_id:number) {
    const product = this.productModel.destroy({ where: { id ,seller_id: `${seller_id}` } });
    if(!product){
      return 'Product Not Found';
    }else{
      await this.productModel.destroy({ where: { id } });
      return "Successfully Deleted";
    }
   
  }
}
