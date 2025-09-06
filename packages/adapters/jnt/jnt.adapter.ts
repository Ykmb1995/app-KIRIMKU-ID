// J&T Adapter - Kirimku.ID
export class JntAdapter {
  async getRates(params: { origin: string; destination: string; weight: number }) {
    // TODO: Integrasi ke API J&T asli
    return [
      { service: 'EZ', price: 21000, etd: '2-3 hari' },
      { service: 'JTR', price: 40000, etd: '3-5 hari' }
    ];
  }

  async createShipment(data: any) {
    // TODO: Integrasi ke API J&T untuk create shipment
    return { trackingCode: 'JNT654321', labelUrl: 'https://jnt.co.id/label.pdf' };
  }

  async track(trackingCode: string) {
    // TODO: Integrasi ke API J&T untuk tracking
    return { status: 'delivered', history: [] };
  }

  async schedulePickup(data: any) {
    // TODO: Integrasi ke API J&T untuk pickup
    return { pickupId: 'PICKUP456', status: 'scheduled' };
  }
}
