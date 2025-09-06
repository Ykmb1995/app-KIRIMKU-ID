import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto';

@Injectable()
export class BillingService {
  getUsage(userId: string) {
    // Ambil data penggunaan API/user
    return { userId, usage: 0 };
  }

  createInvoice(dto: CreateInvoiceDto) {
    // Buat invoice baru
    return { invoiceId: 'new_invoice_id', ...dto };
  }
}
