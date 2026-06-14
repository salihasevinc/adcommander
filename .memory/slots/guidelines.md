# Kurallar — Uyulması Zorunlu (Güvenlik-Kritik dahil)

> Kaynak: `CLAUDE.md` + `intent.md` + `DESIGN.md`. Çelişki olursa **intent kazanır**.

## GÜVENLİK-KRİTİK — DO NOT (gerçek para harcanır!)
- **Kampanyalar `PAUSED` başlar** — asla aktif başlatma. Onay ekranında bu açıkça belirtilir.
- **Reklam hesabı token'larını düz metin saklama/loglama/commit etme** — **AES-GCM şifreli**,
  en az yetki, rotasyon, audit kaydı.
- **İnsan onay adımı olmadan Meta/Google'a deploy yok.** Yüksek sürtünmeli onay + yaz-onayla.
- **Geliştirme/testte canlı reklam API'sine yazma** — sandbox/test token kullan.
- **Otomatik bütçe/teklif müdahalesi yok** — yalnızca **öneri** sun.
- **Her deploy için `rollback` bilgisi sakla**; geri-al eylemi görünür kalır.

## Akış & hakikat kaynağı
- Çalışma sırası: **intent → plan → kod**. Yeni iş önce `plan.md`'deki bir faza bağlanır.
- intent/plan ile çelişen kod yazma; gerekirse önce o dökümanı güncelle.

## Tasarımın güvenlik karşılığı (DESIGN.md)
- **SANDBOX/LIVE** ortam rozeti her ekranda görünür.
- Marka indigosu asla "performans iyi" demek değil; **iyi = yeşil, kötü = kırmızı, marka = eylem**.
- Renge anlamı tek başına yükleme — ikon/biçim/işaret (▲▼, nokta) ile yedekle (renk körü güvenliği).
- WCAG AA (gövde ≥ 4.5:1); solid yeşil/amber/info üstüne küçük beyaz metin koyma.
