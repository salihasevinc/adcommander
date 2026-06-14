# AdCommander — memory.md

> Proje bilgi bankası. Her oturumda kazanılan önemli kararlar, desenler ve
> kısıtlamalar buraya yazılır. `@intent.md` ve `@plan.md` ile birlikte okunur.
> **Çelişki → intent.md kazanır.**

Son güncelleme: 14.06.2026

---

## Proje kimliği

- **Ad:** AdCommander ("Command Deck" — komuta güvertesi estetiği)
- **Tip:** Aylık abonelikli SaaS, greenfield (henüz kod yok)
- **Durum:** Genesis — intent ✅ · plan ✅ · design ✅ · kod ❌
- **Birincil kullanıcı:** Küçük/orta ajanslar + freelance performans uzmanları (çoklu hesap yöneten ekipler)
- **İkincil kullanıcı:** E-ticaret KOBİ'leri (kendi reklamını yöneten)
- **Mecra:** Yalnızca Meta + Google Ads (v1); diğerleri kapsam dışı

---

## Kararlar & gerekçeler (sabitlenmiş)

| Karar | Seçim | Gerekçe |
|---|---|---|
| Tech stack | Next.js (App Router) + TypeScript | Tek codebase web+API, TS strict, ajans UI'ı için SSR |
| Veritabanı | PostgreSQL + Prisma | İlişkisel; org→hesap→kampanya→metrik hiyerarşisi |
| Auth | Auth.js (NextAuth) + Organization tenant | Ajans = tenant; çok kullanıcı, çok hesap |
| Arka plan | Kuyruk (Inngest veya BullMQ+Redis) | LLM/görsel üretimi + günlük metrik uzun işler |
| LLM | Anthropic Claude (`claude-sonnet-4-6`) | En güncel + yetenekli; maliyet ve kalite dengesi |
| Görsel | Hazır harici API | Kendi model eğitimi kapsam dışı (intent) |
| Token saklama | AES-GCM şifreleme | Sızıntı kritik; düz metin asla |
| Faturalama | Stripe | Standart aylık abonelik |
| Birincil kullanıcı | Küçük/orta ajanslar | Çoklu-hesap v1'de birinci sınıf; tüm UX kararları bu role göre |
| Kampanya başlangıç | PAUSED | Gerçek para riski; aktif başlatma yasak |

---

## Mimari özet

```
Ajans → [Auth/Org] → AdAccount bağla (OAuth) → Brief gir
   → [Kuyruk] LLM metin + Görsel API → ≥5 varyasyon → Policy ön-kontrol
   → İnsan onay ekranı → [Kuyruk] Meta+Google deploy (PAUSED) → Rollback sakla
   → [Cron] günlük metrik çek → Dashboard + öneri (müdahale yok)
```

**6 modül:** Auth & Çoklu-hesap · Platform Bağlantıları · Kreatif & Metin Üretimi ·
Kampanya Kurulumu · Analiz & Raporlama · Abonelik & Faturalama

**Faz sırası:** F0 (Temel) → F1 (Bağlantılar) → F2 (Üretim) → F3 (Kurulum) →
F4 (Analiz) → F5 (Faturalama & Lansman)

---

## Tasarım sistemi özeti (design.md → Command Deck)

### Estetik kimlik
"Mission control" — Linear netliği + Stripe finansal güveni + Bloomberg veri yoğunluğu.
Duygu hedefi: trader terminali açmış gibi *yetkin* his. Glassmorphism/gradyan/ağır gölge yok.

### Renk katmanları (ASLA karıştırma)
| Katman | Renk | Anlam |
|---|---|---|
| Marka/eylem | Indigo `#3A36DB` | CTA, aktif nav, odak — ASLA "iyi performans" anlamında değil |
| Olumlu performans | Yeşil `#0E9F6E` | ROAS↑, CTR sağlıklı, pozitif delta ▲ — YALNIZCA bu |
| Hata/tehlike | Kırmızı `#DC2B3D` | Hata, aşırı harcama, yıkıcı eylem, LIVE ortam |
| Bekleyen/dikkat | Amber `#C77700` | PENDING REVIEW, SANDBOX ortamı |
| Nötr veri | Mavi `#1B7FD4` | Akış göstergeleri, Meta mecra rozeti |

### Tipografi kuralları
- **Inter** → tüm arayüz metni
- **JetBrains Mono** → yalnızca KPI rakamları + teknik ID'ler
- Tüm tablo/metrik sayıları: **tabular (tnum) + sağa hizalı** — kutsal kural

### Layout (3 bölgeli kokpit)
- Sol ray 248px (nav + hesap bağlamı)
- Üst çubuk 56px (hesap değiştirici, ⌘K, SANDBOX/LIVE rozeti)
- Ana tuval: 12 kolon, max 1440px

### Kampanya durumu rozetleri (renk anlamı)
DRAFT (nötr gri) → PAUSED (nötr, sakin) → PENDING (amber) → LIVE (yeşil) → ERROR (kırmızı) / ROLLED BACK (nötr)
**PAUSED sakin/nötr görünmeli — güvenli varsayılan alarm vermez.**

### Güvenlik UX kuralları (design.md)
- `env-banner-sandbox` (amber) ve `env-banner-live` (kırmızı) **her ekranda her zaman görünür**
- Para-harcatan/geri-alınamaz eylem → `modal-confirm-danger` + **yaz-onayla** adımı + rollback görünür
- `button-danger` yalnızca yıkıcı eylemler için, asla tek başına yeterli değil
- Renk körü güvenlik: durum ikon + biçim + renk birlikte; renge tek başına güvenilmez
- WCAG AA minimum (gövde ≥ 4.5:1); küçük metin için `*-container` + `on-*-container` çifti

### Data viz renk sabitlemeleri (üründe tutarlı)
- spend → indigo · revenue → yeşil · impressions → mavi · clicks → amber · conversions → mor

---

## Güvenlik-kritik kısıtlamalar (her zaman geçerli)

1. **Kampanyalar PAUSED başlar** — aktif başlatma kod seviyesinde engellenmeli
2. **Token düz metin yasak** — AES-GCM şifreli sakla, loglama yasak, commit yasak
3. **Zorunlu insan onayı** — deploy öncesi her zaman; tek tık asla yeterli değil
4. **Dev'de canlı reklam API'sine yazma yasak** — sandbox/test token zorunlu
5. **Otomatik bütçe/teklif müdahalesi yasak** — yalnızca öneri
6. **Rollback bilgisi** — her deploy için saklanmalı, geri-al eylemi görünür kalmalı

---

## Kapsam dışı (v1) — asla ekleme

- TikTok, LinkedIn, X, Amazon Ads vb.
- Otomatik bütçe/teklif optimizasyonu
- Kendi görsel/video üretici modeli eğitmek
- Çoklu dil, white-label, ajans alt-hesap hiyerarşisi
- Muhasebe/fatura entegrasyonu (Stripe dışında)

---

## Açık kararlar (henüz netleşmemiş)

- Görsel üretim API sağlayıcısı (OpenAI Images / Stability / Google Imagen?)
- Kuyruk teknolojisi (Inngest yönetilen vs BullMQ+Redis kendi barındırma?)
- Hosting (Vercel + Neon/Supabase vs başka?)
- intent.md'deki başarı kriteri sayıları kullanıcı gerçeğine göre kesinleşecek

---

## Repo durumu (14.06.2026)

- Branch: `claude/magical-babbage-70541n`
- Dosyalar: `intent.md` · `plan.md` · `CLAUDE.md` · `design.md` · `memory.md`
- Push durumu: yerelde commit'li; uzak repoya yazma yetkisi (403) çözüm bekliyor
- Kod: henüz yok — F0 (Temel scaffold) henüz başlamadı

---

## agentmemory kurulum notu

Kullanıcı https://github.com/rohitg00/agentmemory bellek yönetimi sistemini
istiyor. Kurulum için:
```bash
npm install -g @agentmemory/agentmemory
agentmemory   # port 3111'de başlatır
```
MCP sunucusu olarak Claude Code'a bağlamak için `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "agentmemory": {
      "command": "npx",
      "args": ["-y", "@agentmemory/mcp"],
      "env": { "AGENTMEMORY_URL": "http://localhost:3111" }
    }
  }
}
```
Bu dosyadaki bilgiler (`memory.md`) agentmemory'ye beslenecek başlangıç içeriğidir.
