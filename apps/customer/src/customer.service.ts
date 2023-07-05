import { FirebaseService } from '@app/firebase';
import { StripeService } from '@app/stripe';
import { CustomerCreationDto } from '@app/types';
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class CustomerService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly stripeService: StripeService,
  ) {}

  getCustomers(params: Stripe.Issuing.CardholderListParams) {
    return this.stripeService.stripe.issuing.cardholders.list(params);
  }

  async createCustomer({
    name,
    individual,
    company,
    billing,
    password,
    email,
    phone_number,
    type,
  }: CustomerCreationDto) {
    const user = await this.firebaseService.auth.createUser({
      displayName: name,
      email,
      password,
      phoneNumber: phone_number,
    });

    const stripeCustomer =
      await this.stripeService.stripe.issuing.cardholders.create({
        name,
        individual,
        company,
        billing,
        email,
        phone_number,
        type,
        metadata: {
          uid: user.uid,
        },
      });

    return { stripeCustomer, user };
  }
}
