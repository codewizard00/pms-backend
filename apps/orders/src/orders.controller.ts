import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'libs/common/auth/jwt.gaurd';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,

    ) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrder(@Req() request: any) {
    console.log(request.user)
    return this.ordersService.getOrder();
  }
}
