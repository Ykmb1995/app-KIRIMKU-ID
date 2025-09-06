# Kirimku.ID — API Reference

## Authentication
Semua endpoint API menggunakan JWT Bearer Token di header:
```
Authorization: Bearer <token>
```

---

## Shipping
### 1. Cek Ongkir
`GET /shipping/ongkir`

**Query Params:**
- `origin` (string, required)
- `destination` (string, required)
- `weight` (number, required, gram)
- `courier` (string, required, contoh: jne, jnt, sicepat, anteraja, ninja, sap)

**Response:**
```json
[
  { "service": "REG", "price": 20000, "etd": "2-3 hari" }
]
```

---

### 2. Buat Pengiriman
`POST /shipping/create-shipment`

**Body:**
```json
{
  "orderId": "string",
  "address": "string",
  "items": [ ... ],
  "courier": "jne",
  "cod": true,
  "insurance": false
}
```

**Response:**
```json
{ "shipmentId": "...", "labelUrl": "..." }
```

---

### 3. Tracking Resi
`GET /shipping/tracking/:resi?courier=jne`

**Response:**
```json
{ "status": "in_transit", "history": [ ... ] }
```

---

### 4. Jadwal Pickup
`POST /shipping/pickup`

**Body:**
```json
{
  "address": "string",
  "date": "YYYY-MM-DD",
  "courier": "jne"
}
```

**Response:**
```json
{ "pickupId": "...", "status": "scheduled" }
```

---

## Order
### CRUD Order
- `GET /order` — List order
- `GET /order/:id` — Detail order
- `POST /order` — Buat order
- `PUT /order/:id` — Update order
- `DELETE /order/:id` — Hapus order

---

## Label
- `POST /label/generate` — Generate label pengiriman

---

## Notification
- `POST /notification/send` — Kirim notifikasi (email, WhatsApp, webhook, telegram)

---

## User
- `GET /user` — List user
- `GET /user/:id` — Detail user
- `POST /user` — Buat user
- `PUT /user/:id` — Update user
- `DELETE /user/:id` — Hapus user

---

## Plugin
- `POST /plugin/webhook` — Terima webhook dari plugin eksternal

---

## Billing
- `GET /billing/usage/:userId` — Lihat penggunaan API/user
- `POST /billing/invoice` — Buat invoice baru

---

## Webhook
- Notifikasi status pengiriman, tracking, dsb, dapat dikirim ke endpoint eksternal yang didaftarkan user.

---

## Catatan
- Semua response dalam format JSON.
- Error akan diberikan dengan kode HTTP dan pesan error yang jelas.
