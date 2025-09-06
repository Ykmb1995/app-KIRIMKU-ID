export class CreateInvoiceDto {
  userId: string;
  amount: number;
  description?: string;
  dueDate?: string;
}
