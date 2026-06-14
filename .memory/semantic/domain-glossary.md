# Semantic — Domain Sözlüğü

> Üründe geçen terimlerin tutarlı tanımları. Kod/identifier İngilizce, açıklama Türkçe.

- **Organization (tenant):** Ajans. Çok kullanıcılı; çoklu-hesap yönetiminin kökü.
- **Ad account:** Meta veya Google reklam hesabı; OAuth ile bağlanır, token AES-GCM şifreli saklanır.
- **Campaign:** Kampanya. Yaşam döngüsü: DRAFT → PAUSED → PENDING REVIEW → LIVE → ERROR / ROLLED BACK.
  Varsayılan başlangıç **PAUSED** (güvenli).
- **Creative:** Kreatif (görsel/video). Görsel üretimi hazır harici API ile.
- **Ad copy:** Reklam metni; Claude (`claude-sonnet-4-6`) ile üretilir, brief başına ≥ 5 varyasyon.
- **Brief:** Kampanya girdisi; kreatif + metin varyasyonları bundan türer.
- **Deploy:** Onaylanan kampanyanın Meta/Google'a kurulması. Zorunlu insan onayı + rollback bilgisi.
- **Rollback:** Deploy sonrası geri-alma; her deploy için bilgisi saklanır, eylem görünür kalır.
- **Environment (SANDBOX/LIVE):** Çalışma ortamı; her ekranda rozetle görünür. Dev = sandbox/test token.
- **Metrikler:** spend (harcama), CTR, CPC, CPA, ROAS. Günde 1 otomatik çekilir.
- **Öneri (suggestion):** Bütçe/teklif için yalnızca öneri; otomatik müdahale **yok**.
