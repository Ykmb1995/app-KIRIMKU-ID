import { Controller, Post, Body } from '@nestjs/common';
import { LabelService } from './label.service';
import { GenerateLabelDto } from './dto';

@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post('generate')
  generate(@Body() dto: GenerateLabelDto) {
    return this.labelService.generate(dto);
  }
}
