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

## Kod yazma desenleri

### Yeni bir API route eklerken
1. `app/api/<kaynak>/route.ts` — App Router convention
2. Girdi doğrulama (Zod veya benzeri) — sistem sınırında
3. `lib/<domain>/` altında domain mantığı — route'ta iş mantığı yok
4. Hata: kullanıcıya güvenli mesaj; ayrıntı sunucu logunda

### Yeni bir Prisma modeli eklerken
1. `prisma/schema.prisma`'ya ekle
2. `npx prisma migrate dev --name <açıklayıcı-ad>`
3. Tip güvenliği: Prisma generate çıktısını kullan; elle tip uydurma yok

### Arka plan işi (kuyruk) eklerken
1. Uzun/rate-limit'li işler → senkron değil, kuyruk
2. Retry + idempotency zorunlu (aynı iş iki kez tetiklenirse zarar vermemeli)
3. Başarısız iş → audit log + kullanıcıya bildirim (sessiz başarısız olma)

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
