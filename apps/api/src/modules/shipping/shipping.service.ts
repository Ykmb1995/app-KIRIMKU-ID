import { Injectable } from '@nestjs/common';
import { CreateShipmentDto, GetRatesDto, PickupDto } from './dto';
import { adapters } from '@adapters';

@Injectable()
export class ShippingService {
  async getRates(params: GetRatesDto) {
    const courier = params.courier?.toLowerCase();
    if (!courier || !adapters[courier]) throw new Error('Courier not supported');
    return adapters[courier].getRates(params);
  }

  async createShipment(dto: CreateShipmentDto) {
    const courier = dto.courier?.toLowerCase();
    if (!courier || !adapters[courier]) throw new Error('Courier not supported');
    return adapters[courier].createShipment(dto);
  }

  async track(resi: string, courier: string) {
    const key = courier?.toLowerCase();
    if (!key || !adapters[key]) throw new Error('Courier not supported');
    return adapters[key].track(resi);
  }

  async schedulePickup(dto: PickupDto) {
    const courier = dto.courier?.toLowerCase();
    if (!courier || !adapters[courier]) throw new Error('Courier not supported');
    return adapters[courier].schedulePickup(dto);
  }
}
