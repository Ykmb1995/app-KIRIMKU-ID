export class SendNotificationDto {
  type: 'email' | 'whatsapp' | 'webhook' | 'telegram';
  to: string;
  message: string;
  subject?: string;
  data?: any;
}
