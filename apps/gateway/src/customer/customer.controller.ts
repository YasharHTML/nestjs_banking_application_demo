import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerCreationDto } from '@app/types';
import Stripe from 'stripe';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getCustomers(@Query() params: Stripe.Issuing.CardholderListParams) {
    return this.customerService.getCustomers(params);
  }

  @Post()
  createCustomer(@Body() customerDto: CustomerCreationDto) {
    return this.customerService.createCustomer(customerDto);
  }
}
