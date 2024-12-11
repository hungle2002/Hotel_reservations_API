import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-11-20.acacia',
    },
  );

  constructor(
    /**
     * Injecting configService
     */
    private readonly configService: ConfigService,
  ) {}

  async createCharge({ amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method: 'pm_card_visa',
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
      // payment_method: paymentMethod.id,
      // payment_method_types: ['card'],
    });

    return paymentIntent;
  }
}
