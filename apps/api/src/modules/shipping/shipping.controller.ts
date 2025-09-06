import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShipmentDto, GetRatesDto, PickupDto } from './dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('ongkir')
  getRates(@Query() params: GetRatesDto) {
    return this.shippingService.getRates(params);
  }

  @Post('create-shipment')
  createShipment(@Body() dto: CreateShipmentDto) {
    return this.shippingService.createShipment(dto);
  }

  @Get('tracking/:resi')
  track(@Param('resi') resi: string) {
    return this.shippingService.track(resi);
  }

  @Post('pickup')
  schedulePickup(@Body() dto: PickupDto) {
    return this.shippingService.schedulePickup(dto);
  }
}
