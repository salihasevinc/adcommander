# memory/procedural.md — Prosedürel Bellek

> **Katman 4 — Prosedürel:** Bu projede nasıl çalışılır. İş akışları, karar desenleri,
> güvenlik protokolleri ve tekrarlayan operasyonlar. Uzun vadeli; yalnızca yeni bir
> prosedür oturulunca güncellenir. Claude Code her oturumda bunu okur.

Son konsolidasyon: 14.06.2026

---

## Çalışma sırası (her yeni iş için)

```
1. intent.md → hedefle uyumlu mu?
2. plan.md → hangi faza giriyor? (F0–F5)
3. memory/semantic.md → mevcut karar/deseni yeniden icat etme
4. Kod yaz → standartlara uy
5. Commit → açıklayıcı mesaj, faz referansı
```

Yeni iş bir fazla eşleşmiyorsa → önce plan.md'yi güncelle, sonra koda geç.

---

## Güvenlik protokolü (her zaman)

### Kampanya deploy akışı
```
Kreatif üret → Policy ön-kontrol → İNSAN ONAY EKRANI
  → Deploy (PAUSED zorunlu) → Rollback bilgisi sakla
```
Hiçbir adım atlanamaz. Tek tık asla yeterli değil.

### Token işleme
- Erişim: şifreli oku → bellek içinde kullan → asla logla
- Saklama: AES-GCM; anahtar env/KMS'ten; düz metin commit yasak
- Rotasyon: refresh süresinden önce; audit kaydı tut

### Ortam ayrımı
- Dev/test: **sandbox/test token** — canlı API'ye yazma yasak
- SANDBOX/LIVE rozeti her ekranda görünür; kod ortamı kontrol et

---

## AdCommander'a özgü domain protokolleri

> Bunlar bu projeye özeldir — jenerik framework tarifi değil, AdCommander'ın
> "para harcatan SaaS" doğasından doğan zorunlu desenler.

### Reklam platformuna (Meta/Google) HER yazma
- Doğrudan API çağrısı **yasak** — her yazma tek bir deploy kapısından (`lib/deploy/`) geçer.
- O kapı zorunlu olarak: (1) `status=PAUSED` enjekte eder, (2) insan onayı flag'i kontrol eder,
  (3) ortamı doğrular (dev → yalnızca sandbox token), (4) rollback meta'sını yazar, (5) audit'ler.
- Bütçe/teklif **değiştiren** çağrı kod tabanında bulunmamalı — yalnızca öneri üretilir, uygulanmaz.

### Reklam hesabı token'ına HER erişim
- Düz `connection.token` okuması yasak — tek bir helper (`lib/crypto/`) üzerinden AES-GCM çöz.
- Token asla log/hata mesajı/exception payload'una girmez (sızıntı = kritik).
- Her okuma/yenileme bir `AuditLog` satırı üretir; rotasyon refresh süresinden önce tetiklenir.

### Kreatif/metin üretimi (LLM + görsel API)
- Üretim çıktısı **doğrudan deploy edilemez** → önce policy ön-kontrol (yasaklı sektör/iddia),
  sonra insan onay ekranı. ≥5 varyasyon zorunlu (başarı kriteri).
- LLM/görsel çağrıları kuyruğa girer (rate-limit + maliyet); kullanıcı bazlı kota kontrol edilir.

### Günlük metrik çekimi
- Cron → kuyruk; hesap başına **idempotent** günlük `MetricSnapshot` (aynı gün iki kez = tek kayıt).
- Çekilen metrik seti sabittir: spend, CTR, CPC, CPA/ROAS (dashboard bunları bekler).

### Çoklu-tenant her sorgu
- Her DB sorgusu `organizationId` ile kapsanmalı — bir ajans başka ajansın hesabını ASLA görmez.
- Bu, route/lib seviyesinde unutulması en kolay ve en tehlikeli hatadır; her yeni sorguda doğrula.

---

## Commit kuralları

```
<kısa özet (50 karakter)>

<faz referansı> — <ne değişti, neden>

https://claude.ai/code/session_<id>
```

- Branch: `claude/<isim>` — main'e doğrudan push yok
- PR: yalnızca açıkça istenince
- Her faz işi tek mantıksal commit'te

---

## Konsolidasyon tetikleyicileri

Aşağıdaki durumlar oluşunca ilgili bellek katmanını güncelle:

| Olay | Güncelle |
|---|---|
| Yeni mimari/teknoloji kararı alındı | `semantic.md` |
| Yeni iş akışı/protokol oturdu | `procedural.md` |
| Bir faz tamamlandı | `episodic.md` + `semantic.md` |
| Yeni bir `working.md` gözlemi olgunlaştı | İlgili üst katmana taşı, `working.md`'den sil |
