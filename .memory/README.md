# `.memory/` — AdCommander Ajan Hafıza Sistemi

Bu klasör, [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory)
sisteminin **mimari kavramlarının AdCommander'a uyarlanmış, hafif ve git-takipli
bir versiyonudur**. Orijinal agentmemory bir çalışma-zamanı motorudur (`iii`
framework + portlar + worker'lar + vektör embedding + otomatik hook'lar);
greenfield bir repoda bu ağırlık gereksizdir. Bunun yerine onun **bilgi modelini**
düz markdown dosyalarına taşıyoruz: maliyetsiz, denetlenebilir, PR'da gözden
geçirilebilir ve hiçbir gizli veri içermez.

## Amaç
Ajanın (Claude) oturumlar arası **kalıcı, taşınabilir hafızası**. Bir oturumda
öğrenilen kararlar, gerçekler ve iş akışları burada yaşar; sonraki oturum sıfırdan
başlamaz. Hakikat kaynakları (`intent.md` > `plan.md` > kod) ile **çelişmez**,
onları **özetler ve tamamlar**. Çelişki olursa intent kazanır; bu klasör değil.

## Dört-katmanlı model (agentmemory'den uyarlandı)
İnsan hafıza konsolidasyonundan esinli hiyerarşi:

| Katman | Klasör | İçerik | Analoji |
|---|---|---|---|
| **Working** | `working/` | Aktif oturumun ham/geçici notları. Kalıcı değil, sık temizlenir. | Kısa vadeli |
| **Episodic** | `episodic/` | Oturum özetleri — "ne oldu", hangi kararlar verildi. | "Ne oldu" |
| **Semantic** | `semantic/` | Projeye dair kalıcı gerçekler, terimler, kararlar. | "Ne biliyorum" |
| **Procedural** | `procedural/` | Tekrarlayan iş akışları — "nasıl yapılır". | "Nasıl yapılır" |

## Memory slots (`slots/`)
agentmemory'deki "düzenlenebilir sabitlenmiş bölümler". Her oturum başında
**önce bunlar okunur**. Sabit isimlidir, üzerine yazılarak güncellenir:

- `persona.md` — ajanın bu projedeki rolü ve duruşu
- `preferences.md` — kullanıcı/proje tercihleri (dil, üslup, araçlar)
- `guidelines.md` — uyulması zorunlu proje kuralları (güvenlik-kritik dahil)
- `context.md` — projenin **şu anki** durumu (en sık değişen dosya)

## Yazma kuralları (DO / DO NOT)
- ✅ **Türkçe yaz** (proje dili). Kod/identifier İngilizce kalır.
- ✅ Her madde **kısa, doğrulanabilir bir gerçek** olsun; spekülasyon değil.
- ✅ Bir gerçek değişince **eskisini güncelle/sil** — çelişen iki kayıt bırakma.
- ✅ `context.md` ve `episodic/` her anlamlı ilerlemede güncellenir.
- ❌ **Sır/token/anahtar/PII yazma.** Bu klasör commit'lenir; `.env` mantığıyla
  asla gizli veri taşımaz. (CLAUDE.md güvenlik kuralının hafıza karşılığı.)
- ❌ Hakikat kaynaklarıyla (intent/plan) çelişen "karar" yazma; önce o dökümanı
  güncelle, sonra buraya özetle.
- ❌ Ham log/çıktı yığma — `semantic/` ve `procedural/` damıtılmış bilgidir.

## Okuma sırası (oturum başında)
1. `slots/*` (persona → preferences → guidelines → context)
2. `semantic/*` (kalıcı gerçekler)
3. `procedural/*` (gerekli iş akışı için)
4. `episodic/*` (son oturum özetleri — yalnızca ilgili olanlar)
