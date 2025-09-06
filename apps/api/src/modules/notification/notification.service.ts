import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './dto';

@Injectable()
export class NotificationService {
  send(dto: SendNotificationDto) {
    // Kirim notifikasi (email, WhatsApp, webhook, dsb)
    return { success: true };
  }
}
