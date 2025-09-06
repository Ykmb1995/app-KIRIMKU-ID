import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('usage/:userId')
  getUsage(@Param('userId') userId: string) {
    return this.billingService.getUsage(userId);
  }

  @Post('invoice')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.billingService.createInvoice(dto);
  }
}
