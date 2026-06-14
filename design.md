---
version: alpha
name: AdCommander — Command Deck
description: >-
  Performans pazarlamacıları için enstrüman-hassasiyetinde bir komuta paneli
  kimliği. Sinyal-renkli, tablo-numaralı, güven veren ve para harcatan
  eylemleri görsel olarak yavaşlatan bir "mission control" estetiği.
colors:
  # — Foundation / Neutrals (kağıt + mürekkep) —
  background: "#F7F8FA"
  surface: "#FFFFFF"
  surface-container-low: "#F2F4F8"
  surface-container: "#ECEFF4"
  surface-container-high: "#E4E8EF"
  on-surface: "#10141B"
  on-surface-variant: "#586273"
  outline: "#DEE3EB"
  outline-variant: "#EAEEF3"
  surface-tint: "#3A36DB"
  inverse-surface: "#161B26"
  inverse-on-surface: "#F2F4F8"

  # — Brand / Action (Command Indigo) —
  primary: "#3A36DB"
  on-primary: "#FFFFFF"
  primary-hover: "#2F2CC0"
  primary-pressed: "#2825A6"
  primary-container: "#E7E6FB"
  on-primary-container: "#1C198A"
  focus-ring: "#3A36DB"

  # — Semantic / Performance (anlam = renk, dekorasyon değil) —
  positive: "#0E9F6E"
  on-positive: "#FFFFFF"
  positive-container: "#DCF5EC"
  on-positive-container: "#064C36"

  error: "#DC2B3D"
  on-error: "#FFFFFF"
  error-container: "#FCE4E6"
  on-error-container: "#7A0C18"

  warning: "#C77700"
  on-warning: "#FFFFFF"
  warning-container: "#FCEFD3"
  on-warning-container: "#6B4500"

  info: "#1B7FD4"
  on-info: "#FFFFFF"
  info-container: "#DBEDFB"
  on-info-container: "#0A3F70"

  # — Data Viz serileri (çok serili grafikler için ayrık tonlar) —
  chart-spend: "#3A36DB"
  chart-revenue: "#0E9F6E"
  chart-impressions: "#1B7FD4"
  chart-clicks: "#C77700"
  chart-conversions: "#7C3AED"
  chart-grid: "#EAEEF3"

typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 600
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: -0.01em
  title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.005em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: 14px
    letterSpacing: 0.06em
  data:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 450
    lineHeight: 18px
    fontFeature: "tnum"
  metric-xl:
    fontFamily: JetBrains Mono
    fontSize: 34px
    fontWeight: 600
    lineHeight: 38px
    letterSpacing: -0.01em
    fontFeature: "tnum"
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: 500
    lineHeight: 26px
    fontFeature: "tnum"
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px

rounded:
  sm: 4px
  DEFAULT: 6px
  md: 8px
  lg: 10px
  xl: 14px
  full: 9999px

spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  gutter: 24px
  rail-width: 248px
  topbar-height: 56px
  container-max: 1440px
  table-row: 44px
  table-row-compact: 36px
  columns: 12

components:
  # — Aksiyon öğeleri —
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.DEFAULT}"
    padding: 0 14px
    height: 36px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.DEFAULT}"
    padding: 0 14px
    height: 36px
  button-secondary-hover:
    backgroundColor: "{colors.surface-container}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
    rounded: "{rounded.DEFAULT}"
    padding: 0 10px
    height: 32px
  button-ghost-hover:
    backgroundColor: "{colors.surface-container}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label}"
    rounded: "{rounded.DEFAULT}"
    padding: 0 14px
    height: 36px

  # — Form / giriş —
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
    height: 38px
  input-field-focus:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  select-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
    height: 38px

  # — KPI / metrik —
  kpi-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.metric-xl}"
    rounded: "{rounded.md}"
    padding: 20px
  kpi-label:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-caps}"
  delta-positive:
    textColor: "{colors.positive}"
    typography: "{typography.label}"
  delta-negative:
    textColor: "{colors.error}"
    typography: "{typography.label}"

  # — Çoklu-hesap performans tablosu —
  table-header:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-caps}"
    height: 40px
    padding: 0 12px
  table-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.data}"
    height: 44px
    padding: 0 12px
  table-cell-numeric:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.data}"
    height: 44px
    padding: 0 12px
  table-row-hover:
    backgroundColor: "{colors.surface-container-low}"

  # — Kampanya durum rozetleri (DRAFT → PAUSED → PENDING → LIVE) —
  badge-draft:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-paused:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-pending:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-live:
    backgroundColor: "{colors.positive-container}"
    textColor: "{colors.on-positive-container}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-error:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  badge-rolledback:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 10px

  # — Mecra rozetleri —
  channel-meta:
    backgroundColor: "{colors.info-container}"
    textColor: "{colors.on-info-container}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  channel-google:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 2px 8px

  # — Ortam göstergeleri (SANDBOX vs LIVE — para riski) —
  env-banner-sandbox:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
  env-banner-live:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 6px 12px

  # — Kabuk / navigasyon —
  account-switcher:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 6px 10px
    height: 36px
  sidebar-rail:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-variant}"
    width: "{spacing.rail-width}"
  nav-item-active:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 8px 12px

  # — Geçici / katman öğeleri —
  command-palette:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 8px
  modal-confirm-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  toast:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  chart-container:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
---

## Overview

**Genel Bakış.** Bu tasarım sistemi bir komuta güvertesidir — bir kontrol panelinden öte, performans pazarlamacısının bütçeyi pilotladığı bir *mission control*. Hedef kullanıcı (çoklu hesap yöneten küçük/orta ajanslar ve freelance uzmanlar) günün her saatini Meta Ads Manager ve Google Ads içinde, metriklere bakarak geçirir. AdCommander bu kişiye iki şey hissettirmeli: **mutlak kontrol** ve **mutlak güven**.

Estetik adı **"Command Deck"**: enstrüman-hassasiyetinde, sinyal odaklı, sessiz ama keskin. İlham; Linear'ın klavye-öncelikli netliği, Stripe'ın finansal güveni, Bloomberg Terminal'in veri yoğunluğu ve Dieter Rams ile Edward Tufte'nin "less but better / maximize data-ink" disiplinidir. Arayüz parlamaz, gösteriş yapmaz; **sinyali yükseltir, gürültüyü siler.**

Duygu hedefi: kullanıcı paneli açtığında bir trader terminali açmış gibi *yetkin* hissetmeli. Burası gerçek paranın aktığı bir kokpittir; bu yüzden sistemin kalbinde bir ilke vardır — **para harcatan her eylem görsel olarak yavaşlatılır, güvenli varsayılan (PAUSED) ise sakin görünür.** Tasarım, CLAUDE.md'deki güvenlik kurallarının görsel karşılığıdır: tehlike asla tek tıkla gelmez, ortam (SANDBOX/LIVE) hep görünür, geri-alınamaz işlemler sürtünme ister.

## Colors

**Renkler.** Palet üç katmana ayrılır ve bu ayrım kutsaldır: **nötr zemin**, **marka eylemi** ve **anlamsal performans**. En kritik kural buradan doğar — *marka rengi (indigo) asla "performans iyi" anlamına gelmez; "iyi" yalnızca yeşilin işidir.* Bir CTA ile bir kazanç sinyalini aynı renge boyamak, bu kitlenin güvenini anında kaybettirir.

- **Primary — Command Indigo (#3A36DB):** Marka ve birincil eylem. Butonlar, aktif nav, odak halkası, seçili durumlar. Otorite ve kararlılık taşır; enerjiktir ama neon değildir. Beyaz metinle ~7.7:1 kontrast — AAA.
- **Positive — Gain (#0E9F6E):** Yalnızca olumlu performans: ROAS artışı, sağlıklı CTR, pozitif delta (▲). Solid yeşil + beyaz metin küçük puntoda kullanılmaz; küçük metin için `positive-container` + `on-positive-container` çifti kullanılır.
- **Error / Negative (#DC2B3D):** Hata, aşırı harcama uyarısı, yıkıcı eylem, negatif delta (▼). LIVE ortam göstergesinin de zeminidir — çünkü canlı = dikkat.
- **Warning — Pending (#C77700):** İnceleme bekleyen (PENDING REVIEW), SANDBOX ortamı, dikkat. Ochre/amber; alarm değil, "dur ve bak."
- **Info — Signal (#1B7FD4):** Nötr veri vurgusu, canlı/akış göstergeleri, Meta mecra rozeti. Markadan ayrı bir mavi olması bilinçlidir; indigo ile karışmamalı.

Nötrler hafif **soğuk** tonludur (#F7F8FA kağıt, #10141B mürekkep) — saf siyah-beyaz yerine, uzun seanslarda gözü yormayan, "premium matte" bir his. Yüzeyler birbirinden **gölgeyle değil, saç-teli kenarlıkla** (`outline`) ayrılır.

**Veri görselleştirme:** Grafik serileri sabit anlamlara bağlanır — `chart-spend` indigo, `chart-revenue` yeşil, `chart-impressions` mavi, `chart-clicks` amber, `chart-conversions` mor. Aynı metrik üründe her yerde aynı renkte görünür; bu tutarlılık öğrenme maliyetini sıfırlar.

**Karanlık "Focus Mode" (öneri):** Uzun izleme seansları için karanlık tema, aynı semantikle sunulur — zemin `#0E1117`, yüzey `#161B26`, mürekkep `#E6EAF2`, indigo bir tık parlatılır (`#5B57F0`). Semantik tonlar (yeşil/kırmızı/amber/mavi) karanlıkta da AA üstü kontrast koruyacak şekilde açılır. Tema değişimi *anlamı* değil yalnızca *ışığı* değiştirir.

## Typography

**Tipografi.** İki sesli bir strateji: nötr bir arayüz sesi + enstrüman-grade bir sayı sesi.

- **Inter** tüm arayüzün sesidir — başlıklar, gövde, etiketler. Mükemmel okunabilirliği ve geometrik-hümanist nötrlüğü ile premium ama gösterişsizdir. Büyük başlıklar (`display`, `headline-lg`) sıkı harf aralığıyla (-0.02em) "kilitlenmiş" ve sağlam durur.
- **JetBrains Mono** yalnızca sayının sesidir — büyük KPI rakamları (`metric-xl`), KPI döşeme değerleri (`metric-md`) ve teknik alanlar (hesap ID, kampanya ID). Bu monospaced seçim panele bir "terminal/komuta" karakteri katar ve rakamlara enstrüman ağırlığı verir.

**Tablo numaraları kutsaldır.** Tablodaki ve metriklerdeki tüm sayılar **tabular (tnum)** rakamlarla dizilir (`data`, `metric-*` stillerinde `fontFeature: tnum`) ve **sağa hizalanır**. Böylece kolonlardaki basamaklar dikey hizalanır; göz harcama/ROAS sütununu tek bakışta tarayabilir. Hizasız, orantılı rakamlarla dizilmiş bir performans tablosu bu üründe bir kusurdur.

`label-caps`; tablo başlıkları ve bölüm "eyebrow"ları için seyrek aralıklı (0.06em) küçük-büyük harf etiketidir — veriyi etiketler, dikkat çalmaz.

## Layout

**Düzen ve Boşluk.** 4px temel birim üzerine kurulu kati bir ızgara. Ölçek: 4 · 8 · 12 · 16 · 24 · 32 · 48px.

Kabuk üç bölgeli bir **kokpit** düzenidir:
- **Sol ray (248px):** Kalıcı navigasyon + hesap bağlamı. Sessiz zemin (`surface-container-low`), aktif öğe indigo tint.
- **Üst komuta çubuğu (56px):** Hesap/tenant değiştirici, global arama (⌘K), ortam rozeti (SANDBOX/LIVE) ve hesap kapsamı. Çoklu hesap yöneten ajans için **hesap değiştirici birinci sınıf** bir öğedir.
- **Ana tuval:** 12 kolon, içerik maksimum 1440px. Paneller veri tablolarına ve KPI ızgaralarına optimize, geniştir.

**Yoğunluk pazarlamacının lehinedir.** Varsayılan "comfortable" satır 44px; güç kullanıcısı için **"compact" (36px)** yoğunluk anahtarı sunulur — çünkü 30 hesap × N kampanya = çok satır. Boşluk, içerik "adaları" yaratmak için kullanılır: grup içi sıkı (8–16px), gruplar arası geniş (24–48px). Veri-mürekkep oranı maksimize edilir; dekoratif boşluk veya çerçeve eklenmez.

## Elevation & Depth

**Yükseklik ve Derinlik.** Kısıtlama (restraint) esastır. Bu bir veri enstrümanıdır — glassmorphism, gradyan veya ağır gölge **yoktur**. Katmanlar öncelikle **1px `outline` saç-teli kenarlıkla** ayrılır (Linear/Stripe disiplini).

Gölge yalnızca *geçici/uçan* katmanlara ayrılır ve soğuk tonlu, düşük yayılımlıdır:
- **e0 — Düz:** Kartlar, tablolar, paneller. Sadece kenarlık. Gölge yok.
- **e1 — İnce:** Sticky tablo başlığı, hover'daki satır. `0 1px 2px rgba(16,20,27,0.06)`.
- **e2 — Popover/menü/dropdown:** `0 4px 12px rgba(16,20,27,0.10)`, 1px kenarlık.
- **e3 — Modal & ⌘K komut paleti:** `0 16px 48px rgba(16,20,27,0.18)` + arka plan örtüsü (scrim) `rgba(16,20,27,0.40)`.

Odak (focus) her zaman görünür: `focus-ring` indigo, 2px halka + 2px offset. Klavye-öncelikli kullanım birinci sınıftır.

## Shapes

**Şekiller.** Dil "Soft-Technical" — hassas ama agresif değil. Köşeler tekniktir: girişler/küçük öğeler `sm` (4px), butonlar varsayılan `DEFAULT` (6px), kartlar/paneller `md` (8px), modallar `lg` (10px), komut paleti `xl` (14px). Durum rozetleri **tam yuvarlak (full)** hap biçimindedir ve daima **önlerinde anlamsal renkte bir nokta** taşır — renk körü kullanıcı için biçim+ikonla yedeklenir, renge asla tek başına güvenilmez.

## Components

**Bileşenler.**

### Aksiyon öğeleri
`button-primary` indigo zeminli birincil eylemdir; hover'da koyulaşır (`primary-hover`), basıldığında daha da (`primary-pressed`). `button-secondary` beyaz zemin + 1px kenarlık, ikincil yol. `button-ghost` yalnızca metin, düşük dikkat. **`button-danger`** kırmızı zeminlidir ve yalnızca yıkıcı/para-harcatan eylemlerde belirir — ve asla yalnız başına yeterli değildir (bkz. onay kapısı).

### KPI döşemeleri
`kpi-tile` büyük `metric-xl` (JetBrains Mono) rakamı, üstünde `label-caps` etiket taşır. Değerin yanında **delta** durur: `delta-positive` yeşil ▲, `delta-negative` kırmızı ▼ — işaret + renk + ok birlikte, asla tek sinyal değil.

### Çoklu-hesap performans tablosu
Ürünün kalbi. `table-header` sessiz zemin + `label-caps`; `table-cell` 44px (compact 36px), sayısal hücreler **sağa hizalı + tabular**. Zebra şerit yok; satırlar saç-teli kenarlıkla ayrılır, hover'da `surface-container-low`. Birincil sütun (hesap/kampanya adı) sola sabitlenir (sticky), metrik sütunları yatay kayar.

### Durum & mecra rozetleri
Kampanya yaşam döngüsü tek bakışta okunur: **DRAFT** (nötr gri) → **PAUSED** (nötr, sakin — *güvenli varsayılan asla alarm rengi taşımaz*) → **PENDING REVIEW** (amber) → **LIVE** (yeşil) → **ERROR** (kırmızı) / **ROLLED BACK** (nötr). `channel-meta` mavi, `channel-google` nötr rozetlerle mecra ayrımı.

### Ortam & onay (GÜVENLİK-KRİTİK)
- `env-banner-sandbox` (amber) ve `env-banner-live` (kırmızı) **her zaman görünür** kalır. Geliştirici sandbox'ta, kullanıcı canlıda olduğunu asla unutmaz.
- `modal-confirm-danger`: Meta/Google'a deploy gibi para-harcatan ve geri-alınamaz eylemler **yüksek sürtünmeli** onay ister — net özet, etkilenecek hesap/bütçe, ve **yaz-onayla** (kampanya adını yazma) adımı. Tek tık asla yeterli değildir. Varsayılan başlangıç **PAUSED**'tır ve onay ekranında bu açıkça belirtilir. Her deploy için `rollback` bilgisi saklanır ve geri-al eylemi görünür kalır.

### Kabuk & geçici katmanlar
`account-switcher` üst çubukta, `nav-item-active` indigo tint, `command-palette` (⌘K) ile her şeye klavyeden ulaşılır, `toast` koyu zeminli kısa bildirim, `chart-container` 16px iç boşluklu grafik yüzeyi.

## Do's and Don'ts

**Yapılması ve Yapılmaması Gerekenler.**

- ✅ **Yap:** Tüm sayıları tabular (tnum) + sağa hizalı diz. Kolonlardaki basamaklar dikey hizalansın.
- ❌ **Yapma:** Marka indigosunu "performans iyi" anlamında kullanma. "İyi" = yeşil, "kötü" = kırmızı; marka = eylem. Bu üç dünya asla karışmaz.
- ✅ **Yap:** PAUSED'ı sakin/nötr göster — güvenli varsayılan görsel olarak rahatlatıcı olmalı.
- ❌ **Yapma:** Para-harcatan veya geri-alınamaz eylemi tek tıkla sun. Daima onay kapısı + yaz-onayla + net özet.
- ✅ **Yap:** SANDBOX/LIVE ortam rozetini her ekranda görünür tut. Geliştirme canlıya asla yazmaz.
- ❌ **Yapma:** Veri yüzeylerinde glassmorphism, gradyan veya ağır gölge kullanma. Katmanları saç-teli kenarlıkla ayır.
- ✅ **Yap:** Renge anlamı asla tek başına yükleme — durumu ikon/biçim/işaret (▲▼, nokta, etiket) ile yedekle. Renk körü güvenliği şarttır.
- ✅ **Yap:** WCAG AA'yı koru (gövde metni ≥ 4.5:1). Solid yeşil/amber/info üstüne küçük beyaz metin koyma; bunun yerine `*-container` + `on-*-container` çiftini kullan.
- ❌ **Yapma:** Dekoratif boşluk/çerçeve ekleyerek veri-mürekkep oranını düşürme. Sinyal artar, krom azalır.
- ✅ **Yap:** Klavye-öncelikli ol — ⌘K her yerde, odak halkası daima görünür.
- ✅ **Yap:** Aynı metriği üründe her yerde aynı renkte göster (spend daima indigo, revenue daima yeşil).
