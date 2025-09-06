import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  findAll(query: any) {
    // Query order dari database
    return [];
  }

  findOne(id: string) {
    // Ambil detail order
    return { id };
  }

  create(dto: CreateOrderDto) {
    // Buat order baru
    return { id: 'new_order_id', ...dto };
  }

  update(id: string, dto: UpdateOrderDto) {
    // Update order
    return { id, ...dto };
  }

  remove(id: string) {
    // Hapus order
    return { id, deleted: true };
  }
}
