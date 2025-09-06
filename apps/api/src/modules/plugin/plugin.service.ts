import { Injectable } from '@nestjs/common';
import { PluginWebhookDto } from './dto';

@Injectable()
export class PluginService {
  webhook(dto: PluginWebhookDto) {
    // Proses webhook dari plugin eksternal (WooCommerce, Shopify, dsb)
    return { received: true };
  }
}
