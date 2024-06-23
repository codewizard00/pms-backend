import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should return a successful response with the correct message when products are fetched', async () => {
    const productServiceMock = { findAll: jest.fn().mockResolvedValue(['product1', 'product2']) };
    const reqMock = { user: { id: 1 } };
    const productController = new ProductController(productServiceMock);

    const result = await productController.findAll(reqMock);

    expect(productServiceMock.findAll).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      message: "Product List Fetched Successfully",
      data: ['product1', 'product2']
    });
  });
});
