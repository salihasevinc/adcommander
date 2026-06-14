# AdCommander — Project Intent

> Bu dosya projenin **kuzey yıldızıdır**. Her teknik kararın, her satır kodun ve her
> ürün tavsiyesinin bu dokümandaki niyet, kapsam ve ilkelerle uyumlu olması beklenir.
> Bir karar bu dokümanla çelişiyorsa, kod yazmadan önce dur ve netleştir.
>
> **Görev ayrımı:**
> - `intent.md` (bu dosya) → **Neden** ve **Ne** yapıyoruz (strateji, kapsam, ilkeler).
> - `CLAUDE.md` → **Nasıl** çalışıyoruz (komutlar, dizin yapısı, kod standartları, çalıştırma talimatları).
>
> Claude Code: Bir özelliğe başlamadan önce bu dosyayı oku. Belirsizlik varsa
> "Decisions to Confirm" bölümüne ve "Çalışma İlkeleri"ne başvur.

---

## 1. Vizyon (Tek Cümle)

**AdCommander**, dijital reklamcılık ekiplerinin Meta ve Google Ads üzerindeki
reklam kreatif/metin üretimini, kampanya kurulumunu ve performans analizini tek bir
panelden otomatikleştirerek operasyonel iş yükünü minimuma indiren, abonelik tabanlı
(SaaS) bir reklam operasyon platformudur.

## 2. Çözdüğümüz Problem

Dijital reklam yönetimi bugün dağınık, manuel ve tekrara dayalıdır:

- Kreatif ve reklam metinleri elle, sezgisel ve tutarsız şekilde üretiliyor.
- Kampanya kurulumu (Meta Ads Manager + Google Ads) ayrı arayüzlerde, tekrar tekrar,
  hataya açık biçimde yapılıyor.
- Performans verisi platformlara dağılmış durumda; anlamlı bir analiz için manuel
  raporlama gerekiyor.
- Tüm bu işler ajanslar/freelancer'lar için ölçeklenemez bir zaman maliyeti yaratıyor.

AdCommander bu üç adımı — **üret → kur → ölç & optimize et** — tek bir döngüde toplar.

## 3. Hedef Kullanıcılar

| Persona | İhtiyaç | Değer |
|---|---|---|
| Performans pazarlama ajansları | Çok sayıda müşteri hesabını az kişiyle yönetmek | Ölçeklenebilir operasyon, daha çok müşteri/kişi |
| Freelancer / solo pazarlamacı | Manuel işten kurtulmak | Zaman tasarrufu, profesyonel çıktı |
| KOBİ pazarlama ekipleri | Uzman olmadan iyi reklam kurmak | Rehberli, optimize kurulum |

**Birincil müşteri (ödeme yapan):** Birden fazla reklam hesabı yöneten ajanslar ve
freelancer'lar. Ürün kararlarında önce bu persona düşünülür.

## 4. Temel Değer Önerisi

1. **Otomatik kreatif & metin optimizasyonu** — bağlı reklam hesabının geçmiş verisine
   ve hedefe göre, marka tonuna uygun, platform politikalarına uyumlu metin/kreatif önerileri.
2. **Tek tıkla kampanya kurulumu** — Meta ve Google Ads'te kampanya/ad set/reklam
   yapısını idempotent ve güvenli şekilde oluşturma.
3. **Birleşik performans analizi** — tüm hesapların metriklerini tek panelde toplayan,
   eyleme dönük (actionable) içgörüler ve optimizasyon önerileri üreten analiz katmanı.

> Ürünün "kazanan" anı: Kullanıcı bir hedefi tarif eder, AdCommander metinleri üretir,
> kampanyayı kurar, ve birkaç gün içinde "şu reklamı durdur, şu bütçeyi artır" gibi
> somut öneriler sunar.

## 5. Kapsam (Scope)

### 5.1. MVP'ye Dahil (v1)
- Meta (Facebook/Instagram) ve Google Ads hesap bağlama (OAuth).
- AI ile reklam metni üretimi/optimizasyonu (varyant üretme, ton ayarı, policy kontrolü).
- Temel kampanya kurulumu: kampanya → ad set/ad group → ad (taslak + yayına alma).
- Performans verisi senkronizasyonu ve birleşik dashboard (temel metrikler: spend, CTR,
  CPC, CPA, ROAS, conversions).
- Kural tabanlı + AI destekli optimizasyon önerileri (henüz otomatik aksiyon değil, öneri).
- Multi-tenant hesap yapısı ve aylık abonelik/faturalandırma.

### 5.2. Kapsam Dışı (v1'de YAPILMAZ — aksi belirtilmedikçe)
- Kreatif görsel/video **üretimi** (üretim değil; metin + mevcut görsel seçimi/öneri ile başla).
- Tam otomatik, insan onayı olmadan bütçe/teklif değiştirme (v1'de "öneri", "auto" değil).
- Meta/Google dışındaki platformlar (TikTok, LinkedIn, X vb.).
- Karmaşık atıf modelleme / cross-channel attribution.
- Beyaz etiket (white-label) ve gelişmiş rol yönetimi (v2+).

> **Kural:** Kapsam dışı bir özelliği "yardımcı olur" diye eklemeden önce dur ve sor.
> Over-engineering bu projenin en büyük riskidir. MVP'yi küçük ve sağlam tut.

## 6. Çekirdek Modüller (Mimari Niyet)

1. **Identity & Tenancy** — kullanıcı, organizasyon (tenant), üyelik, rol.
2. **Connections** — Meta & Google Ads OAuth bağlantıları, token yaşam döngüsü, yenileme.
3. **Creative Studio** — AI ile metin/varyant üretimi, marka profili, policy kontrolü.
4. **Campaign Builder** — kampanya/ad set/ad modelleme ve platform API'lerine yazma.
5. **Insights & Sync** — metrik senkronizasyonu (background jobs), normalize edilmiş veri modeli.
6. **Optimization Engine** — kural + AI tabanlı öneri üretimi.
7. **Billing** — abonelik planları, kullanım, ödeme sağlayıcı entegrasyonu.
8. **Audit & Observability** — her platform yazma işlemi için iz kaydı, loglama, metrikler.

## 7. Domain'e Özel Kritik Gerçekler (Atlanırsa proje çöker)

Bunlar "nice to have" değil, **temel kısıtlardır**. Tasarım bunlara göre yapılır:

- **Platform App Review:** Hem Meta Marketing API hem Google Ads API üretim erişimi için
  uygulama inceleme süreci ve özel onay (Google Ads için Developer Token "Basic/Standard
  Access") gerektirir. Mimari, henüz onay alınmadan **test/sandbox** modunda
  geliştirilebilecek şekilde tasarlanmalı; canlı erişim bir konfigürasyon adımı olmalı.
- **API Versiyonlama:** Meta Graph/Marketing API ve Google Ads API sık versiyon değiştirir
  ve eski versiyonlar kullanımdan kalkar. API versiyonu **konfigüre edilebilir** ve tek
  yerden yönetilebilir olmalı (her yere gömülmemeli).
- **Rate Limit & Quota:** Her iki platform da sıkı rate limit uygular. Tüm API çağrıları
  retry/backoff, kuyruk ve throttling ile yönetilmeli; senkronizasyon batch'lenmeli.
- **Idempotency:** Kampanya/ad oluşturma **asla** yanlışlıkla iki kez yapılmamalı.
  Yazma işlemleri idempotency key + audit ile korunmalı (yanlış reklam = müşteri parası).
- **Token Güvenliği:** OAuth access/refresh token'ları **şifrelenmiş** saklanmalı
  (at-rest encryption), asla log'a/URL'e yazılmamalı, asla istemciye gönderilmemeli.
- **Reklam Policy Uyumu:** AI üretilen metinler Meta & Google reklam politikalarına
  takılabilir (sağlık iddiaları, abartı, yasaklı kategoriler). Üretim katmanı bir
  **policy-aware** kontrol içermeli ve riskli içeriği işaretlemeli.
- **Para riski:** Bu ürün gerçek bütçeleri harcar. Her yayına alma adımı varsayılan olarak
  **insan onayı** ister; "yayınla" geri alınamaz bir aksiyon olarak ele alınır.

## 8. Fonksiyonel Olmayan Gereksinimler

- **Güvenlik:** Tenant izolasyonu (bir müşteri başka müşterinin verisini asla göremez),
  en az ayrıcalık, şifreli token saklama, denetim logu.
- **Gizlilik & Uyum:** KVKK (Türkiye) ve GDPR uyumu hedeflenir; kişisel veri minimize
  edilir, veri saklama/silme politikası tanımlanır.
- **Güvenilirlik:** Senkronizasyon ve yazma işlemleri hataya dayanıklı (idempotent, retry'lı).
  Bir platformun çökmesi diğer modülü kilitlemez.
- **Gözlemlenebilirlik:** Structured logging, hata izleme, platform yazma işlemleri için
  tam audit trail.
- **Maliyet kontrolü:** AI (LLM) çağrıları ve API kullanımı izlenir; tenant başına maliyet
  görünür olmalı (abonelik fiyatlandırmasının altını oyamamak için).
- **Performans:** Dashboard önbelleklenmiş normalize veriden okur; canlı API'yi her sayfa
  açılışında dövmez.

## 9. Önerilen Teknoloji Temeli (Baseline — değiştirilebilir, ama tutarlı kal)

Solo/küçük ekip + Claude Code ile hızlı ve tutarlı ilerlemek için önerilen taban.
Farklı bir tercih varsa **bu bölümü güncelle**, sonra ona sadık kal.

- **Dil:** TypeScript (uçtan uca tek dil → Claude Code için tutarlılık).
- **Frontend & Backend:** Next.js (App Router) + React + Tailwind CSS.
- **Veritabanı:** PostgreSQL + Prisma ORM.
- **Auth:** Auth.js (NextAuth) veya Clerk.
- **Background jobs / kuyruk:** BullMQ + Redis (metrik senkron, API yazma işleri).
- **AI katmanı:** Anthropic Claude API (metin/varyant üretimi, optimizasyon önerileri).
- **Ödeme:** Stripe (uluslararası) — Türkiye odaklıysa iyzico değerlendirilir.
- **Reklam API'leri:** Meta Marketing API, Google Ads API (resmî client kütüphaneleri).
- **Hosting:** Vercel + yönetilen Postgres (Neon/Supabase) veya tek VPS.

> Mimari kalıp: Reklam platformu entegrasyonları bir **adapter/port** katmanının
> arkasında soyutlanır (`MetaAdapter`, `GoogleAdsAdapter` ortak bir arayüzü uygular).
> Böylece yeni platform eklemek ve test etmek (mock adapter) kolaylaşır.

## 10. Veri Modeli Niyeti (Yüksek Seviye)

Normalize, platform-bağımsız bir çekirdek model + platform-özel detay:

- `Organization` (tenant) → `User`, `Membership`
- `AdConnection` (platform, encrypted tokens, durum) → `AdAccount`
- `Campaign` → `AdSet`/`AdGroup` → `Ad` → `Creative`/`Copy`
- `MetricSnapshot` (tarih bazlı normalize metrikler: spend, impressions, clicks, conv, ...)
- `Recommendation` (optimizasyon önerisi, durum: pending/applied/dismissed)
- `Subscription`, `Plan`, `UsageRecord`
- `AuditLog` (kim, ne zaman, hangi platforma, ne yazdı)

Platform-özel alanlar `externalId` + `rawPayload` (JSON) ile saklanır; çekirdek model temiz kalır.

## 11. Başarı Ölçütleri

**Ürün/iş:**
- Aktif ödeyen tenant sayısı ve aylık tekrarlayan gelir (MRR).
- Tenant başına yönetilen reklam hesabı ve kampanya sayısı.
- Kullanıcının manuel kurulum süresine kıyasla kazandığı zaman.
- Önerilerin uygulanma oranı (öneri kalitesinin göstergesi).

**Mühendislik:**
- Sıfır yanlış/çift kampanya oluşturma (idempotency hedefi).
- Senkron başarı oranı ve API hata/retry oranları.
- Tenant başına AI/API maliyetinin abonelik fiyatına oranı (sağlıklı marj).

## 12. Çalışma İlkeleri (Claude Code için karar rehberi)

1. **Önce niyet:** Yeni bir özelliğe başlamadan bu dokümanla uyumunu kontrol et.
2. **Küçük ve sağlam:** MVP kapsamını koru. Kapsam dışı bir şey "faydalı" görünüyorsa,
   eklemeden önce kullanıcıya sor.
3. **Para ve token kutsaldır:** Gerçek bütçe harcayan veya token'a dokunan her işlemde
   güvenlik, idempotency ve insan onayını varsayılan al.
4. **Soyutlamayı koru:** Platform-özel kodu adapter katmanının dışına sızdırma.
5. **Test edilebilirlik:** Reklam API'lerini mock'layabilecek şekilde kod yaz; gerçek
   API'ye bağımlı testler yazma.
6. **Belirsizlikte dur ve sor:** Eksik bilgi varsa varsayım yığıp ilerlemek yerine net soru sor.
7. **Tutarlılık:** Bu dokümandaki teknoloji ve mimari kararlarına sadık kal; sapma gerekiyorsa
   önce bu dosyayı güncelle.
8. **Gözlemlenebilirlik baştan:** Her platform yazma işlemi audit log'a yazılır.

## 13. Sözlük (Domain Terimleri)

- **Creative:** Reklamın görsel/video + metin bütünü.
- **Copy:** Reklam metni (başlık, açıklama, CTA).
- **Campaign / Ad Set (Meta) / Ad Group (Google):** Reklam hiyerarşisi seviyeleri.
- **Tenant:** Tek bir müşteri organizasyonu (multi-tenant SaaS'ta izolasyon birimi).
- **ROAS:** Reklam harcamasının getirisi. **CPA:** Edinim başına maliyet. **CTR:** Tıklama oranı.
- **Developer Token (Google Ads):** Google Ads API erişimi için gereken, onay seviyeli token.

## 14. Onaylanması Gereken Kararlar (Decisions to Confirm)

Bu doküman akıllı varsayımlarla yazıldı. Aşağıdaki kararlar netleştikçe ilgili bölümler
güncellenmelidir:

- [ ] Teknoloji tercihi: Önerilen TypeScript/Next.js tabanı mı, yoksa farklı bir stack mi
      (örn. Python/FastAPI backend)?
- [ ] Birincil pazar: Türkiye odaklı mı, global mi? (Ödeme sağlayıcı: iyzico vs Stripe; KVKK vs GDPR önceliği)
- [ ] Abonelik planları: Kaç kademe, fiyatlandırma kullanım bazlı mı (hesap/kampanya sayısı) sabit mi?
- [ ] Kreatif görsel: v1'de yalnızca metin mi, yoksa görsel öneri/üretimi de hedef mi?
- [ ] Optimizasyon otomasyon seviyesi: v1 "öneri" ile mi sınırlı, ne zaman "auto-apply"?
- [ ] Hangi platform önce: Meta mı Google mı ilk derinlemesine entegre edilecek?

---

*Son güncelleme: bu doküman canlı bir belgedir. Proje ilerledikçe niyet değişirse,
kod değişmeden önce bu dosya güncellenir.*
