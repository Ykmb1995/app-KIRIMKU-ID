import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  findAll(query: any) {
    // Query user dari database
    return [];
  }

  findOne(id: string) {
    // Ambil detail user
    return { id };
  }

  create(dto: CreateUserDto) {
    // Buat user baru
    return { id: 'new_user_id', ...dto };
  }

  update(id: string, dto: UpdateUserDto) {
    // Update user
    return { id, ...dto };
  }

  remove(id: string) {
    // Hapus user
    return { id, deleted: true };
  }
}
