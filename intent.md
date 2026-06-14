# AdCommander — intent.md

> **Niyet sözleşmesi.** Plan ve koddan önce yazılır; AdCommander'ın "ne istediğini" tek dosyada netleştirir.
> Bu dosya **tek hakikat kaynağıdır**: plan buradan türer, kapsam dışı listesi planı korur. Çelişki olursa bu dosya kazanır.

**Yaşam döngüsü:** Oluştur → Tartış → Arşivle  ·  **Aşama:** Oluştur
**Sahip:** «adınız»  ·  **Tarih:** «GG.AA.YYYY»  ·  **Kapsam:** Proje genesis (v1 / MVP)

---

## Bağlam
Dijital reklamcılıkta kreatif üretimi, reklam metni yazımı, Meta ve Google Ads kurulumu ve kurulum sonrası performans analizi bugün büyük ölçüde elle, dağınık araçlarla ve tekrar tekrar yapılıyor. Ajanslar ve reklam verenler her hesap için aynı operasyonel döngüyü manuel tekrarlıyor — bu zaman kaybı, insan hatası ve yüksek operasyon maliyeti demek. Bu uçtan uca döngüyü tek panelde toplayan, abonelik bazlı bir araç ihtiyacı var. AdCommander henüz yok; sıfırdan kurulacak.

## Hedef
Reklam hesaplarına bağlanıp kreatif ve metinleri optimize eden, Meta ve Google Ads'te reklam kurulumunu otomatikleştiren ve kurulum sonrası performansı analiz eden; aylık abonelikle satılan tek bir SaaS platformu yayına almak.

## Kullanıcı
- **Birincil:** Performans pazarlama yürüten küçük/orta ajanslar ve freelance reklam uzmanları; çok sayıda hesabı elle yöneten ekipler. *(rol: kampanya yöneticisi / performans uzmanı)*
- **İkincil:** Kendi reklamını yöneten e-ticaret KOBİ'leri. *(rol: işletme sahibi / pazarlamacı)*
- *(Birincil kullanıcıyı netleştir — v1'in tüm ürün kararları bu role göre verilecek.)*

## Başarı kriteri *(sayılabilir)*
- Kullanıcı Meta ve Google reklam hesabını OAuth ile ≤ **10 dk** içinde bağlayabiliyor.
- Tek bir kampanya brief'inden ≥ **5** kreatif + reklam metni varyasyonu otomatik üretiliyor.
- Onaylanan bir kampanya, manuel panel açılmadan platform üzerinden Meta **ve** Google'a ≤ **5 dk** içinde kuruluyor.
- Bağlı her hesabın temel metrikleri (harcama, CTR, CPC, CPA/ROAS) **günde 1** otomatik çekilip tek ekranda gösteriliyor.
- Lansmandan sonraki **90 gün** içinde ≥ **10** ödeyen aylık abone.
- *(Hedef sayıları kendi gerçeğine göre güncelle — kriterler ölçülebilir kalmalı.)*

## Kapsam dışı *(v1'de yapmayacaklarımız)*
- Meta ve Google **dışındaki** mecralar (TikTok, LinkedIn, X, Amazon Ads vb.).
- Otomatik **bütçe/teklif** optimizasyonu ve kurallı otopilot — yalnızca öneri sunulur, otomatik müdahale yok.
- Görsel/video üretimi için kendi üretici modelimizi eğitmek — hazır API'ler kullanılır.
- Çoklu dil arayüzü, white-label ve ajans alt-hesap hiyerarşisi.
- Fatura/muhasebe entegrasyonları (abonelik tahsilatı dışında).

## Riskler *(tuzak → azaltma)*
- **Platform API onayı/incelemesi gecikir** (Meta App Review, Google Ads API erişim onayı) → erken başvuru; geliştirici/test token'larıyla ilerleme; onay öncesi sandbox.
- **Reklam politikası ihlali** (otomatik üretilen içerik reddedilir, hesap riske girer) → üretim sonrası policy ön-kontrolü; zorunlu insan onay adımı; yasaklı sektör/iddia filtreleri.
- **API rate limit & maliyet** (LLM + reklam API çağrıları ölçeklenince pahalı/yavaş) → önbellekleme, kuyruk, kullanım kotaları; abonelik fiyatını maliyet üstüne kurma.
- **Veri güvenliği & token saklama** (reklam hesabı erişim token'ları sızarsa kritik) → şifreli saklama, en az yetki ilkesi, token rotasyonu, denetim kaydı.
- **Yanlış kurulum gerçek para harcatır** → kampanyalar varsayılan "duraklatılmış" başlar; net onay ekranı; geri alma (rollback).
