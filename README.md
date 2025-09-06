# Kirimku.ID

Unified Shipping API & Dashboard untuk semua ekspedisi Indonesia.

![CI](https://github.com/Ykmb1995/app-KIRIMKU-ID/actions/workflows/ci.yml/badge.svg?branch=main)

## Struktur Monorepo
- apps/api: Backend utama (NestJS)
- apps/dashboard: Frontend dashboard (React.js)
- packages/adapters: Integrasi ekspedisi (JNE, J&T, dsb)
- packages/notification: Modul notifikasi (email, WhatsApp, webhook)
- packages/label: Modul cetak label (PDF)
- prisma: Schema & migrasi database
- docker: Dockerfile & docker-compose
- docs: Dokumentasi API & plugin

## Getting Started
Lihat `docs/` untuk panduan setup & development.
