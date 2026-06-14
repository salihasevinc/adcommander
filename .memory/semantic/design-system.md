# Semantic — Tasarım Sistemi ("Command Deck")

> Kaynak: `DESIGN.md`. Token detayları için her zaman DESIGN.md'nin frontmatter'ına bak.

## Kimlik
- Estetik: **"Command Deck"** — enstrüman-hassasiyetinde mission control. İlham:
  Linear (klavye-öncelikli netlik), Stripe (finansal güven), Bloomberg Terminal
  (veri yoğunluğu), Rams + Tufte (maximize data-ink).
- **İlke:** Para harcatan her eylem **görsel olarak yavaşlatılır**; güvenli varsayılan
  (PAUSED) sakin görünür. Tasarım = CLAUDE.md güvenlik kurallarının görsel karşılığı.

## Renk (üç kutsal katman)
- **Nötr zemin** (soğuk tonlu: `#F7F8FA` kağıt, `#10141B` mürekkep) — yüzeyler gölge değil
  **1px hairline `outline`** ile ayrılır.
- **Marka / eylem** = Command Indigo `#3A36DB` (CTA, aktif nav, focus ring).
- **Anlamsal** = positive yeşil `#0E9F6E`, error kırmızı `#DC2B3D`, warning amber `#C77700`,
  info mavi `#1B7FD4`.
- **KURAL:** indigo asla "iyi" demek değil. iyi=yeşil, kötü=kırmızı, marka=eylem. Karışmaz.
- Data-viz sabit: spend=indigo, revenue=yeşil, impressions=mavi, clicks=amber, conversions=mor.
- Karanlık "Focus Mode" önerisi: zemin `#0E1117`, yüzey `#161B26`, indigo `#5B57F0`.

## Tipografi
- **Inter** = arayüz sesi (başlık/gövde/etiket). **JetBrains Mono** = yalnızca sayı sesi
  (KPI rakamları, hesap/kampanya ID).
- **Tablo sayıları kutsal:** tabular (`tnum`) + **sağa hizalı**. Hizasız orantılı rakam = kusur.

## Düzen (kokpit, üç bölge)
- Sol ray **248px** (kalıcı nav + hesap bağlamı), üst komuta çubuğu **56px**
  (hesap/tenant değiştirici, ⌘K arama, SANDBOX/LIVE rozeti), ana tuval 12 kolon / maks **1440px**.
- Yoğunluk pazarlamacının lehine: satır **44px** (comfortable) / **36px** (compact) anahtarı.
- 4px temel ızgara: 4·8·12·16·24·32·48.

## Derinlik
- Glassmorphism/gradyan/ağır gölge **YOK**. Katmanlar hairline kenarlıkla.
- Gölge yalnızca uçan katmanlar: e1 sticky/hover, e2 popover, e3 modal/⌘K (+scrim).
- Focus ring daima görünür: indigo 2px halka + 2px offset. Klavye-öncelikli birinci sınıf.

## Bileşenler (öne çıkanlar)
- Butonlar: primary (indigo) / secondary (beyaz+kenarlık) / ghost / **danger** (kırmızı, yalnız
  yıkıcı eylemde ve asla tek başına yeterli değil → onay kapısı).
- Kampanya yaşam döngüsü rozetleri: **DRAFT** (gri) → **PAUSED** (nötr, sakin — güvenli
  varsayılan alarm rengi taşımaz) → **PENDING REVIEW** (amber) → **LIVE** (yeşil) →
  **ERROR** (kırmızı) / **ROLLED BACK** (nötr). Her rozet önünde anlamsal renkli nokta.
- Mecra rozetleri: `channel-meta` mavi, `channel-google` nötr.
- Güvenlik-kritik: `env-banner-sandbox`/`-live` her zaman görünür; `modal-confirm-danger`
  yaz-onayla (kampanya adını yaz) + net özet + etkilenecek hesap/bütçe + rollback.
