# AdCommander — plan.md

> **Plan dökümanı.** `intent.md`'den türetilmiştir. Çelişki olursa **intent.md kazanır**.
> Bu döküman "ne istediğimizi"yi (intent) "nasıl yapacağımıza" (mimari + fazlar) bağlar.

**Türetildiği kaynak:** `intent.md` (v1 / MVP, Proje genesis)
**Yaşam döngüsü:** Oluştur → Tartış → Arşivle · **Aşama:** Oluştur
**Tarih:** 14.06.2026 · **Kapsam:** v1 / MVP

---

## 1. Bağlam & Hedef

Dijital reklam operasyonu (kreatif üretimi, metin yazımı, Meta/Google Ads kurulumu,
kurulum sonrası analiz) bugün elle ve dağınık araçlarla, her hesap için tekrar tekrar
yapılıyor. AdCommander bu uçtan uca döngüyü **tek panelde** toplayan, **aylık abonelikli**
bir SaaS olarak sıfırdan kurulacak.

**Uçtan uca döngü:** Hesaba bağlan → brief'ten kreatif + metin üret → insan onayından
sonra Meta **ve** Google'a otomatik kur → günlük metrik çek, tek ekranda göster + öneri sun.

**Birincil kullanıcı (sabitlenmiş):** Küçük/orta ajanslar ve freelance performans uzmanları
— çok sayıda hesabı yöneten ekipler. Bu nedenle **çoklu-hesap yönetimi v1'de birinci sınıf**
bir özelliktir; tüm ürün kararları bu role göre verilir.

---

## 2. Mimari Genel Bakış

Tek bir full-stack Next.js uygulaması; ağır/uzun işler arka plan kuyruğuna devredilir.

| Katman | Seçim | Not |
|---|---|---|
| Web + API | **Next.js (App Router) + TypeScript** | Tek codebase, SSR + API routes |
| Veritabanı | **PostgreSQL + Prisma** | İlişkisel; org/hesap/kampanya ilişkileri |
| Kimlik & Tenant | **Auth.js (NextAuth)** + Organization modeli | Ajans = tenant, çok kullanıcı |
| Arka plan işleri | **Kuyruk** (Inngest *veya* BullMQ + Redis) | Günlük metrik çekimi, üretim, deploy |
| LLM (metin) | **Anthropic Claude** (`claude-sonnet-4-6`, gerekirse Opus) | En güncel ve yetenekli model |
| Görsel üretimi | **Hazır harici API** | intent: kendi model eğitimi kapsam dışı |
| Reklam API'leri | **Meta Marketing API**, **Google Ads API** | OAuth + kampanya CRUD |
| Faturalama | **Stripe** | Aylık abonelik |
| Sır/token saklama | **AES-GCM şifreleme** (anahtar env/KMS) | Token rotasyonu + audit |

**Akış (yüksek seviye):**
```
Ajans → [Auth/Org] → AdAccount bağla (OAuth) → Brief gir
   → [Kuyruk] LLM + Görsel API → ≥5 varyasyon → Policy ön-kontrol
   → İnsan onay ekranı → [Kuyruk] Meta+Google deploy (PAUSED) → Rollback bilgisi sakla
   → [Cron] günlük metrik çek → Dashboard + öneri
```

---

## 3. Veri Modeli (taslak)

- **Organization** — ajans/tenant. Sahip, plan, üyeler.
- **User** — Organization üyesi (rol: owner/manager). Auth.js ile.
- **AdAccount** — bağlı reklam hesabı (platform: meta|google). Bir Org → çok AdAccount.
- **PlatformConnection** — OAuth bağlantısı: **şifreli access/refresh token**, son yenileme,
  rotasyon durumu, kapsam (scope). Her erişim → **audit kaydı**.
- **CampaignBrief** — kullanıcı girdisi (hedef, kitle, ton, ürün, kısıtlar).
- **Creative** / **AdCopy** — brief'ten üretilen varyasyonlar (≥5), policy kontrol durumu,
  onay durumu (pending/approved/rejected).
- **Campaign** — kurulan kampanya. Durum: `draft | paused | live`. Platform referans
  ID'leri, **rollback için gerekli meta veri** (oluşturulan nesnelerin id'leri).
- **MetricSnapshot** — günlük metrik (spend, CTR, CPC, CPA/ROAS), AdAccount + tarih bazlı.
- **Subscription** — Stripe abonelik durumu (active/past_due/canceled).
- **AuditLog** — token erişimi, deploy, rollback gibi kritik olaylar.

---

## 4. Modüller

1. **Auth & Çoklu-hesap** — Auth.js ile kimlik; Organization (ajans) tenant modeli; bir
   ajansın çok sayıda AdAccount'u yönetmesi **birinci sınıf**. Rol bazlı erişim.
2. **Platform Bağlantıları** — Meta Marketing API + Google Ads API **OAuth** akışları;
   token'lar **şifreli** saklanır; otomatik **refresh/rotasyon**; her erişim **audit**'lenir.
3. **Kreatif & Metin Üretimi** — brief → Claude ile reklam metni + harici API ile görsel;
   **≥5 varyasyon**; üretim sonrası **policy ön-kontrolü** (yasaklı sektör/iddia filtresi).
4. **Kampanya Kurulumu** — onaylı varyasyonları Meta + Google kampanya yapısına eşle, API
   ile deploy; **varsayılan `PAUSED` başlar**; net **onay ekranı**; **rollback** desteği.
5. **Analiz & Raporlama** — günlük **cron** ile metrik çek (spend, CTR, CPC, CPA/ROAS);
   **tek ekran** dashboard; yalnızca **öneri** sunulur — otomatik müdahale yok.
6. **Abonelik & Faturalama** — Stripe ile **aylık abonelik**; plan limitleri/kotalar.

---

## 5. Faz Planı (sıralı — her faz bir başarı kriterine bağlı)

| Faz | İçerik | Bağlı başarı kriteri |
|---|---|---|
| **F0 — Temel** | Repo scaffold, Next.js+TS, PostgreSQL+Prisma, Auth.js, Organization modeli, CI | (altyapı) |
| **F1 — Bağlantılar** | Meta + Google **OAuth**, şifreli token saklama + rotasyon, audit | OAuth ile **≤ 10 dk** bağlanma |
| **F2 — Üretim** | Brief → Claude metin + görsel API, **≥5 varyasyon**, policy ön-kontrol, insan onayı | Tek brief'ten **≥ 5** varyasyon |
| **F3 — Kurulum** | Onaylı kampanya → Meta+Google deploy, **PAUSED** default, onay ekranı, rollback | Panelden **≤ 5 dk** kurulum |
| **F4 — Analiz** | Günlük cron metrik çekimi, tek ekran dashboard, öneri | **Günde 1** metrik, tek ekran |
| **F5 — Faturalama & Lansman** | Stripe aylık abonelik, plan/kota, lansman | 90 günde **≥ 10** ödeyen abone |

---

## 6. Teknoloji Kararları & Gerekçe

- **Next.js + TS (tek codebase):** Web + API tek yerde; SaaS için hızlı başlangıç ve tek
  dilde tip güvenliği. Ajans kullanıcısı için zengin dashboard UI'ı kolaylaştırır.
- **PostgreSQL + Prisma:** Org → AdAccount → Campaign → Metric ilişkileri doğal olarak
  ilişkisel; çoklu-hesap raporlaması için güçlü sorgu.
- **Auth.js + Organization tenant:** Birincil kullanıcı ajans olduğundan çok-kullanıcı /
  çok-hesap birinci sınıf; alt-hesap **hiyerarşisi** ise v1 kapsam dışı (bkz. §8).
- **Arka plan kuyruğu:** LLM/görsel üretimi ve günlük metrik çekimi uzun ve rate-limit'e
  tabi; senkron istek-yanıt yerine kuyruk + retry + kota şart.
- **Claude (en güncel model):** Metin üretimi kalitesi için; görsel için hazır API
  (kendi model eğitimi intent'te kapsam dışı).
- **Stripe:** Standart aylık abonelik tahsilatı; muhasebe entegrasyonu kapsam dışı.

---

## 7. Riskler → Teknik Karşılık

| Risk (intent) | Teknik karşılık |
|---|---|
| Platform API onayı gecikir | Erken başvuru; geliştirici/test token'larıyla ilerle; onay öncesi **sandbox** ortamı |
| Reklam politikası ihlali | Üretim sonrası **policy ön-kontrol** + **zorunlu insan onayı** + yasaklı sektör/iddia filtresi |
| API rate limit & maliyet | **Önbellekleme** + **kuyruk** + **kullanım kotaları**; abonelik fiyatı maliyet üstüne |
| Token sızıntısı | **AES-GCM şifreli** saklama, **en az yetki**, **token rotasyonu**, **audit log** |
| Yanlış kurulum gerçek para harcatır | Kampanya **`PAUSED` başlar**, net **onay ekranı**, **rollback** |

---

## 8. Kapsam Dışı (v1) — intent.md'den taşındı

- Meta ve Google **dışındaki** mecralar (TikTok, LinkedIn, X, Amazon Ads vb.).
- Otomatik **bütçe/teklif** optimizasyonu ve kurallı otopilot (yalnızca öneri).
- Görsel/video için **kendi üretici modelimizi eğitmek** (hazır API kullanılır).
- **Çoklu dil** arayüzü, **white-label**, ajans **alt-hesap hiyerarşisi**.
- **Fatura/muhasebe** entegrasyonları (abonelik tahsilatı dışında).

---

## 9. Açık Sorular

- **Hedef sayılar:** intent.md'deki kriter sayıları (≤10 dk, ≥5 varyasyon, ≥10 abone vb.)
  kendi gerçeğine göre kesinleşecek mi?
- **Görsel üretim API'si:** Hangi sağlayıcı (ör. OpenAI Images, Stability, Google Imagen)?
- **Kuyruk teknolojisi:** Inngest (yönetilen) vs. BullMQ + Redis (kendi barındırma)?
- **Hosting:** Vercel + yönetilen Postgres (ör. Neon/Supabase) vs. başka?
