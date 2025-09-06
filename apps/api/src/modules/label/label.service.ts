import { Injectable } from '@nestjs/common';
import { GenerateLabelDto } from './dto';

@Injectable()
export class LabelService {
  generate(dto: GenerateLabelDto) {
    // Generate label pengiriman (PDF/PNG)
    return { labelUrl: 'https://example.com/label.pdf' };
  }
}
