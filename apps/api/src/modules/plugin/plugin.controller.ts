import { Controller, Post, Body } from '@nestjs/common';
import { PluginService } from './plugin.service';
import { PluginWebhookDto } from './dto';

@Controller('plugin')
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  @Post('webhook')
  webhook(@Body() dto: PluginWebhookDto) {
    return this.pluginService.webhook(dto);
  }
}
