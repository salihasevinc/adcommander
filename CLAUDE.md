# CLAUDE.md — AdCommander

AdCommander; reklam hesaplarına bağlanıp kreatif/metin üreten, **Meta ve Google Ads**
kurulumunu otomatikleştiren ve performansı analiz eden, aylık abonelikli bir SaaS'tır.
Birincil kullanıcı: **küçük/orta ajanslar** (çoklu-hesap yönetimi birinci sınıf).

## Hakikat kaynakları & akış
- `@intent.md` → **tek hakikat kaynağı** (niyet sözleşmesi). Çelişki olursa **intent kazanır**.
- `@plan.md` → v1/MVP yol haritası (mimari, modüller, fazlar).
- `@design.md` → tasarım sistemi (Command Deck): renk, tipografi, layout, component spec, UX güvenlik kuralları.
- Çalışma sırası: **intent → plan → kod**. Yeni iş, önce plan.md'deki bir faza bağlanmalı.
- intent/plan ile çelişen kod yazma; gerekirse önce o dökümanı güncelle.

## 4 Katmanlı Bellek Sistemi
Her oturumda otomatik yüklenen kalıcı katmanlar:
- `@memory/semantic.md` → sabitlenmiş gerçekler: kararlar, veri modeli, tasarım özü, başarı kriterleri
- `@memory/procedural.md` → iş akışları: çalışma sırası, güvenlik protokolü, kod desenleri, commit kuralları

Kronolojik / geçici katmanlar (gerektiğinde oku):
- `memory/episodic.md` → tamamlanan fazlar ve oturum tarihi
- `memory/working.md` → aktif oturum ham gözlemleri (oturum sonunda konsolide et)

**Konsolidasyon kuralı:** Yeni karar → `semantic.md` · Yeni protokol → `procedural.md` ·
Faz bitti → `episodic.md` · Ham gözlem olgunlaştı → üst katmana taşı, `working.md`'den sil.

## Tech stack
- **Next.js (App Router) + TypeScript** (web + API tek codebase).
- **PostgreSQL + Prisma** (org/hesap/kampanya/metrik ilişkileri).
- **Auth.js (NextAuth)** + `Organization` tenant modeli (ajans = tenant, çok kullanıcı).
- Arka plan **kuyruğu** (uzun/rate-limit'li işler: üretim, deploy, günlük metrik) — sağlayıcı TBD.
- **Stripe** (aylık abonelik).
- **Anthropic Claude** metin üretimi için — varsayılan model `claude-sonnet-4-6`.
- Görsel üretimi: **hazır harici API** (kendi model eğitimi kapsam dışı).
- Reklam API'leri: **Meta Marketing API**, **Google Ads API**.

## Repo yapısı
Şu an (greenfield — uygulama kodu henüz yok):
- `intent.md` — niyet sözleşmesi
- `plan.md` — yol haritası
- `CLAUDE.md` — bu dosya

İskelet kurulunca beklenen düzen (oluştukça güncelle):
- `app/` — Next.js App Router rotaları (web + API)
- `lib/` — domain mantığı (platform bağlantıları, üretim, deploy, metrik)
- `prisma/` — şema + migration'lar
- `components/` — UI

## Build & test
> Henüz iskelet kurulmadı — komutlar **TBD**. Kod scaffold edilince burayı GERÇEK komutlarla
> güncelle; komut uydurma. Beklenen komutlar (kurulunca doğrula):
> - `npm install`
> - `npm run dev`
> - `npm test`
> - `npm run lint` · `npm run typecheck`
> - `npx prisma migrate dev`

## Kod standartları
- TypeScript **strict** mod; `any`'den kaçın.
- ESLint + Prettier; commit öncesi lint + typecheck temiz olmalı.
- Anlamlı isimler; dosyaları küçük ve tek sorumlu tut.
- Sırlar/anahtarlar `.env` ile; örnek değerler `.env.example`'da. `.env` asla commit'lenmez.

## GÜVENLİK-KRİTİK kurallar — DO NOT (gerçek para harcanır!)
- **DO NOT** kampanyaları aktif başlatma — her kampanya **`PAUSED`** başlar.
- **DO NOT** reklam hesabı token'larını düz metin saklama/loglama/commit etme — **AES-GCM
  şifreli** sakla, en az yetki, rotasyon, audit kaydı.
- **DO NOT** zorunlu **insan onay adımı** olmadan Meta/Google'a deploy etme.
- **DO NOT** geliştirme/test sırasında canlı reklam API'sine yazma — **sandbox/test token**
  kullan.
- **DO NOT** kullanıcıya otomatik bütçe/teklif müdahalesi yapma — yalnızca **öneri** sun.
- Deploy edilen kampanyalar için **rollback** bilgisini her zaman sakla.

## İş akışı
- Geliştirme branch'i: `claude/<isim>` (örn. `claude/magical-babbage-70541n`). `main`'e doğrudan push yok.
- Açıklayıcı commit mesajları; bir fazın işini tek mantıksal commit'te topla.
- **Pull request yalnızca açıkça istenince** açılır.

## Dil
- Proje dökümanları ve kullanıcı iletişimi **Türkçe**. Kod/identifier İngilizce.
