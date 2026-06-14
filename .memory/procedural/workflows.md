# Procedural — İş Akışları ("Nasıl Yapılır")

> Tekrarlayan görevlerin damıtılmış adımları. Yeni kalıp keşfedince ekle.

## Yeni iş başlatma
1. `intent.md`'yi oku → işin niyetle çeliştiğini kontrol et (çelişirse önce intent'i tartış).
2. `plan.md`'de bağlanacak fazı bul. **Yoksa önce plan.md'yi oluştur/güncelle.**
3. Sonra kod. Sıra daima: **intent → plan → kod**.

## Hafıza güncelleme (bu klasör)
1. Anlamlı ilerleme sonrası `slots/context.md`'yi güncelle.
2. Yeni kalıcı gerçek → `semantic/`; yeni iş akışı → `procedural/`.
3. Oturum sonunda `episodic/<tarih>-<konu>.md` özeti yaz.
4. Çelişen eski kaydı sil/güncelle. Sır/token/PII yazma.

## Güvenlik-kritik deploy akışı (Meta/Google)
1. Kampanya **PAUSED** üretilir (asla aktif).
2. Dev/test → **sandbox/test token**; canlı reklam API'sine yazma.
3. Deploy öncesi: policy ön-kontrolü → `modal-confirm-danger` (yaz-onayla + net özet + bütçe/hesap).
4. Deploy sonrası: **rollback bilgisini sakla**, geri-al eylemini görünür tut.
5. Token'lar AES-GCM şifreli; audit kaydı; en az yetki.

## Commit & branch
1. Geliştirme doğrudan **`main`** üzerinde (sahip kararı, 14.06.2026).
2. Bir fazın işini tek mantıksal commit'te topla; açıklayıcı mesaj.
3. Commit öncesi: lint + typecheck temiz.
4. `git push -u origin main`; ağ hatasında 2/4/8/16s backoff ile 4 deneme.
5. PR yalnızca açıkça istenince.
