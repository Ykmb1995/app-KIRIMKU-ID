import { ShippingService } from '../../../src/modules/shipping/shipping.service';
import { adapters } from '@adapters';

describe('ShippingService', () => {
  let service: ShippingService;

  beforeEach(() => {
    service = new ShippingService();
  });

  it('should throw error if courier not supported (getRates)', async () => {
    await expect(service.getRates({ origin: 'JKT', destination: 'BDG', weight: 1000, courier: 'unknown' }))
      .rejects.toThrow('Courier not supported');
  });

  it('should call adapter for supported courier (getRates)', async () => {
    const result = await service.getRates({ origin: 'JKT', destination: 'BDG', weight: 1000, courier: 'jne' });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('service');
  });

  it('should call adapter for createShipment', async () => {
    const result = await service.createShipment({ orderId: '1', address: 'Jalan', items: [], courier: 'jne' });
    expect(result).toHaveProperty('trackingCode');
  });

  it('should call adapter for track', async () => {
    const result = await service.track('JNE123456', 'jne');
    expect(result).toHaveProperty('status');
  });

  it('should call adapter for schedulePickup', async () => {
    const result = await service.schedulePickup({ address: 'Jalan', date: '2025-06-24', courier: 'jne' });
    expect(result).toHaveProperty('pickupId');
  });
});
