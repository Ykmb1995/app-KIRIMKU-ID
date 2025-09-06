export class PluginWebhookDto {
  source: 'woocommerce' | 'shopify' | 'tokopedia' | 'shopee' | 'magento';
  event: string;
  data: any;
}
