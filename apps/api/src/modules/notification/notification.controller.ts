import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  send(@Body() dto: SendNotificationDto) {
    return this.notificationService.send(dto);
  }
}
