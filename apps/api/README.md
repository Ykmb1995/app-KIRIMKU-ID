# Kirimku.ID API

## Dokumentasi Otomatis (Swagger)

Swagger/OpenAPI otomatis tersedia di endpoint:

```
http://localhost:3000/api/docs
```

Swagger akan menampilkan semua endpoint, parameter, dan response secara interaktif.

## Cara Menjalankan

1. Install dependencies:
   ```bash
   yarn install
   # atau
   npm install
   ```
2. Jalankan development server:
   ```bash
   yarn start:dev
   # atau
   npm run start:dev
   ```
3. Buka Swagger di browser:
   ```
   http://localhost:3000/api/docs
   ```

## Testing

- Unit test dan integration test dapat dibuat di folder `test/`.
- Gunakan Jest (default di NestJS):
  ```bash
  yarn test
  # atau
  npm run test
  ```
