# Semantic — Proje Gerçekleri

> Kalıcı, doğrulanmış gerçekler. Değişince güncelle.

## Ürün
- **AdCommander:** Reklam hesaplarına bağlanıp kreatif/metin üreten, Meta & Google Ads
  kurulumunu otomatikleştiren ve performansı analiz eden **aylık abonelikli SaaS**.
- **Birincil kullanıcı:** Çoklu hesap yöneten küçük/orta ajanslar + freelance performans
  uzmanları. **İkincil:** Kendi reklamını yöneten e-ticaret KOBİ'leri.
- **Çoklu-hesap yönetimi birinci sınıf** bir özellik (ajans = tenant).

## Tech stack
- **Next.js (App Router) + TypeScript** — web + API tek codebase.
- **PostgreSQL + Prisma** — org/hesap/kampanya/metrik ilişkileri.
- **Auth.js (NextAuth)** + `Organization` tenant modeli (ajans = tenant, çok kullanıcı).
- **Stripe** — aylık abonelik.
- **Anthropic Claude** — metin üretimi, varsayılan `claude-sonnet-4-6`.
- Görsel üretimi: hazır harici API (kendi model eğitimi kapsam dışı).
- Reklam API'leri: **Meta Marketing API**, **Google Ads API**.
- Arka plan **kuyruğu** (sağlayıcı TBD): üretim, deploy, günlük metrik gibi uzun/rate-limit'li işler.

## Başarı kriterleri (sayılabilir, v1)
- Meta + Google hesabı OAuth ile **≤ 10 dk** bağlanır.
- Tek brief'ten **≥ 5** kreatif + metin varyasyonu üretilir.
- Onaylanan kampanya panel açmadan Meta **ve** Google'a **≤ 5 dk** kurulur.
- Bağlı her hesabın metrikleri (harcama, CTR, CPC, CPA/ROAS) **günde 1** çekilip tek ekranda.
- Lansmandan sonra **90 gün** içinde **≥ 10** ödeyen abone.

## Kapsam dışı (v1)
- Meta/Google **dışı** mecralar (TikTok, LinkedIn, X, Amazon Ads...).
- Otomatik **bütçe/teklif** optimizasyonu / otopilot (yalnızca öneri).
- Kendi görsel/video üretici modelini eğitmek.
- Çoklu dil arayüzü, white-label, ajans alt-hesap hiyerarşisi.
- Fatura/muhasebe entegrasyonları (abonelik tahsilatı hariç).

## Riskler (tuzak → azaltma)
- Platform API onayı gecikir → erken başvuru, dev/test token, sandbox.
- Reklam politikası ihlali → policy ön-kontrolü, zorunlu insan onayı, yasaklı sektör/iddia filtreleri.
- API rate limit & maliyet → önbellek, kuyruk, kota; fiyatı maliyet üstüne kur.
- Token sızıntısı → şifreli saklama, en az yetki, rotasyon, audit.
- Yanlış kurulum gerçek para harcatır → PAUSED başlangıç, net onay, rollback.
