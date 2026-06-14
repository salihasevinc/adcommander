# memory/semantic.md — Semantik Bellek

> **Katman 3 — Semantik:** Proje hakkında çıkarılan kalıcı gerçekler, mimari kararlar,
> veri modeli desenleri ve teknoloji seçimleri. Oturumlar arası değişmez; yalnızca
> yeni bir karar alındığında güncellenir. Claude Code her oturumda bunu okur.

Son konsolidasyon: 14.06.2026

---

## Proje kimliği

- **Ad:** AdCommander · **Tip:** Aylık abonelikli SaaS · **Durum:** Greenfield
- **Mecra:** Meta + Google Ads (yalnızca v1)
- **Birincil kullanıcı:** Küçük/orta ajanslar — çoklu-hesap yönetimi birinci sınıf

## Sabitlenmiş teknoloji kararları

| Katman | Seçim | Neden değiştirme |
|---|---|---|
| Web + API | Next.js App Router + TypeScript strict | Tek codebase, SSR, tip güvenliği |
| DB | PostgreSQL + Prisma | Org→Account→Campaign→Metric ilişkileri |
| Auth | Auth.js + Organization tenant | Ajans = tenant; çok kullanıcı/hesap |
| Kuyruk | Inngest veya BullMQ+Redis (TBD) | LLM/görsel + günlük metrik uzun işler |
| LLM | Anthropic Claude `claude-sonnet-4-6` | En güncel; maliyet+kalite dengesi |
| Görsel | Hazır harici API | Kendi model eğitimi kapsam dışı (intent) |
| Token | AES-GCM şifreleme | Sızıntı kritik; düz metin yasak |
| Faturalama | Stripe | Aylık abonelik |

## Veri modeli çekirdeği

```
Organization (ajans/tenant)
  └── User[] (rol: owner/manager)
  └── AdAccount[] (platform: meta|google)
       └── PlatformConnection (şifreli token, rotasyon, audit)
       └── MetricSnapshot[] (günlük: spend/CTR/CPC/CPA/ROAS)
  └── CampaignBrief[]
       └── Creative[] / AdCopy[] (≥5 varyasyon, policy durum, onay durum)
       └── Campaign (draft|paused|live, rollback meta)
  └── Subscription (Stripe: active|past_due|canceled)
  └── AuditLog[] (token erişim, deploy, rollback)
```

## Tasarım sistemi özü (Command Deck)

**Renk yasası — asla karıştırma:**
- Indigo `#3A36DB` = marka/eylem (CTA, nav, focus) — performans anlamı taşımaz
- Yeşil `#0E9F6E` = YALNIZCA olumlu performans (ROAS↑, delta ▲)
- Kırmızı `#DC2B3D` = hata + LIVE ortam
- Amber `#C77700` = PENDING + SANDBOX ortamı
- Mavi `#1B7FD4` = nötr veri, Meta mecra rozeti

**Tipografi yasası:** Inter (arayüz) + JetBrains Mono (yalnızca KPI ve ID'ler).
Tüm tablo/metrik sayıları `tnum` + sağa hizalı — istisnasız.

**Kampanya yaşam döngüsü:** DRAFT → PAUSED (sakin/nötr) → PENDING (amber) → LIVE (yeşil) → ERROR/ROLLED BACK

## Başarı kriterleri (intent'ten)

| Kriter | Hedef | Faz |
|---|---|---|
| OAuth bağlanma | ≤ 10 dk | F1 |
| Brief → varyasyon | ≥ 5 kreatif+metin | F2 |
| Kampanya kurulum | ≤ 5 dk | F3 |
| Metrik güncelleme | Günde 1 | F4 |
| Ödeyen abone | 90 günde ≥ 10 | F5 |

## Kapsam dışı (v1) — hiçbir zaman ekleme

TikTok/LinkedIn/X/Amazon · Otomatik bütçe/teklif müdahalesi · Kendi görsel modeli ·
Çoklu dil/white-label/alt-hesap hiyerarşisi · Muhasebe entegrasyonu
