import { CustomerCreationDto } from '@app/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import Stripe from 'stripe';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_SERVICE') private readonly natsClient: ClientNats,
  ) {}

  getCustomers(params: Stripe.Issuing.CardholderListParams) {
    return this.natsClient.send('customer.getCustomers', { params });
  }

  createCustomer(customerDto: CustomerCreationDto) {
    return this.natsClient.send('customer.createCustomer', { customerDto });
  }
}
