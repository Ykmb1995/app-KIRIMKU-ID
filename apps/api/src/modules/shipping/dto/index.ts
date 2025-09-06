export class GetRatesDto {
  origin: string;
  destination: string;
  weight: number;
  courier?: string;
}

export class CreateShipmentDto {
  orderId: string;
  address: string;
  items: any[];
  courier: string;
  cod?: boolean;
  insurance?: boolean;
}

export class PickupDto {
  address: string;
  date: string;
  courier: string;
}
