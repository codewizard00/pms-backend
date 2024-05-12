import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
const BILLING_SERVICE = 'BILLING';
@Injectable()
export class OrdersService {

  constructor(
    @Inject(BILLING_SERVICE)
    private readonly billingClient: ClientProxy
  ) {}
  async getOrder() {
    await lastValueFrom(
      this.billingClient.emit('order_created', {id: 1})
    )
  }
}
