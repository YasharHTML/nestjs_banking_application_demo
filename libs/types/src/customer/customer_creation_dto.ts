import Stripe from 'stripe';

export interface CustomerCreationDto
  extends Stripe.Issuing.CardholderCreateParams {
  password: string;
}
