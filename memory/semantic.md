# memory/semantic.md — Semantik Bellek

> **Katman 3 — Semantik:** Dökümanlarda (intent/plan/design) **açıkça yazmayan** ama
> bu projede çalışırken bağlanması gereken damıtılmış gerçekler ve kararların *gerekçeleri*.
> Kaynak dökümanları tekrar etme — onlar zaten CLAUDE.md'de `@import` ediliyor.
> Burası "neden böyle" ve "nereye dikkat" hafızasıdır.

Son konsolidasyon: 14.06.2026

---

## Henüz netleşmemiş kararlar (TBD — bir sonraki oturumda karar ver)

Bunlar kod yazmadan önce kesinleşmeli; intent/plan'da "açık soru" olarak duruyor:

| Konu | Seçenekler | Etki |
|---|---|---|
| Kuyruk teknolojisi | Inngest (yönetilen) vs BullMQ+Redis | F2'den itibaren tüm async iş buna bağlı |
| Görsel üretim API'si | OpenAI Images / Stability / Google Imagen | F2 kreatif modülünün sağlayıcısı |
| Hosting | Vercel + Neon/Supabase vs başka | Cron + kuyruk + Postgres barındırma kararı |
| Başarı kriteri sayıları | intent'teki rakamlar placeholder | Kullanıcı kendi gerçeğine göre kesinleştirecek |

## Karar gerekçeleri (dökümanın söylemediği "neden")

- **Neden Organization tenant, alt-hesap hiyerarşisi DEĞİL:** Birincil kullanıcı ajans ama
  v1'de ajans→müşteri→hesap *hiyerarşisi* bilinçli olarak kapsam dışı. Düz `Org → AdAccount[]`
  modeli yeterli; hiyerarşi eklemek tenant izolasyonunu karmaşıklaştırır, v2 işi.
- **Neden Claude `claude-sonnet-4-6`:** Maliyet/kalite dengesi; metin üretimi hacimli ve
  rate-limit'e tabi olacağı için Opus varsayılan değil (gerekirse seçici olarak yükselt).
- **Neden kampanya `PAUSED` zorunlu (sadece öneri değil):** Yanlış kurulum gerçek para
  harcatır — bu, ürünün en büyük varoluşsal riski. Bu yüzden hem koda (default PAUSED) hem
  tasarıma (sakin PAUSED rozeti, yüksek sürtünmeli onay) gömülü.
- **Neden öneri sunar ama uygulamaz:** Otomatik bütçe/teklif müdahalesi hem kapsam dışı hem
  güven kıran. Ürün "kokpit" — pilot kullanıcı; sistem otopilot değil.

## En kolay unutulan / en tehlikeli noktalar

1. **Tenant izolasyonu:** Her sorgu `organizationId` ile kapsanmalı (bkz. procedural.md).
2. **Renk yasası:** Indigo ASLA "iyi performans" demek değil; "iyi" = yeşil. design.md'nin
   en sık ihlal edilecek kuralı. (Detay design.md'de — burada sadece uyarı.)
3. **SANDBOX/LIVE ayrımı:** Dev kodu canlı reklam API'sine asla yazmamalı; ortam her
   ekranda görünür olmalı.

## Proje durumu (canlı)

- **Faz:** F0 (Temel scaffold) henüz başlamadı. Önce yukarıdaki TBD'ler kapanmalı.
- **Var olan:** intent.md · plan.md · design.md · CLAUDE.md · memory/ (kod yok)
- **Bilinen ortam kısıtı:** Bu oturumda repoya push yetkisi (403) ve commit imzalama yok
  (detay episodic.md). Kod değil, süreç sorunu.
