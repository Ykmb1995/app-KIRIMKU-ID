# Prisma Schema — Kirimku.ID

## Cara Migrasi Database

1. Pastikan sudah mengatur `DATABASE_URL` di file `.env`.
2. Jalankan perintah migrasi:

```bash
npx prisma migrate dev --name init
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

## Struktur Tabel Utama
- User
- Order
- Webhook
- Invoice

Lihat `schema.prisma` untuk detail struktur.
