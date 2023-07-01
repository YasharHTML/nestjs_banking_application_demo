import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerCreationDto } from '@app/types';
import Stripe from 'stripe';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern('customer.getCustomers')
  getCustomers(
    @Payload() { params }: { params: Stripe.Issuing.CardholderListParams },
  ) {
    return this.customerService.getCustomers(params);
  }

  @MessagePattern('customer.createCustomer')
  createCustomer(@Payload() { customerDto }: { customerDto: CustomerCreationDto }) {
    return this.customerService.createCustomer(customerDto);
  }
}
