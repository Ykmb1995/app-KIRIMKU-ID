// SiCepat Adapter - Kirimku.ID
export class SicepatAdapter {
  async getRates(params: { origin: string; destination: string; weight: number }) {
    // TODO: Integrasi ke API SiCepat asli
    return [
      { service: 'REG', price: 19000, etd: '2-4 hari' },
      { service: 'BEST', price: 30000, etd: '1-2 hari' }
    ];
  }

  async createShipment(data: any) {
    // TODO: Integrasi ke API SiCepat untuk create shipment
    return { trackingCode: 'SICEPAT789', labelUrl: 'https://sicepat.com/label.pdf' };
  }

  async track(trackingCode: string) {
    // TODO: Integrasi ke API SiCepat untuk tracking
    return { status: 'pending', history: [] };
  }

  async schedulePickup(data: any) {
    // TODO: Integrasi ke API SiCepat untuk pickup
    return { pickupId: 'PICKUP789', status: 'scheduled' };
  }
}
