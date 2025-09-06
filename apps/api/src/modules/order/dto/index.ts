export class CreateOrderDto {
  userId: string;
  ekspedisi: string;
  items: any[];
  address: string;
  cod?: boolean;
  insurance?: boolean;
}

export class UpdateOrderDto {
  ekspedisi?: string;
  items?: any[];
  address?: string;
  status?: string;
  cod?: boolean;
  insurance?: boolean;
}
