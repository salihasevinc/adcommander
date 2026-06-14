# memory/working.md — Çalışma Belleği

> **Katman 1 — Çalışma:** Aktif oturum gözlemleri, geçici notlar, henüz
> olgunlaşmamış fikirler. Kısa ömürlü; oturum sonunda konsolide edilir.
> Burası "ham" giriş — epizodik/semantik/prosedürel katmanlara sindirilen
> bilgi buradan silinir.

> **Konsolidasyon kuralı:** Bu dosya sürekli küçük kalmalı. Bir gözlem
> üç oturumdan uzun süredir buradaysa → üst katmana taşı veya sil.

---

## Aktif oturum: 14.06.2026

### Ham gözlemler
- `git push` 403 hatası veriyor (salihasevinc için yazma yetkisi yok); GitHub MCP da 403. Çözüm: kullanıcı tarafında repo izni.
- `npm install -g @agentmemory/agentmemory` güvenlik sınıflandırıcı tarafından engellendi. Alternatif: kullanıcı kendisi kursun, MCP config hazır.
- Stop hook `~/.claude/stop-hook-git-check.sh` imzasız commit'leri işaretliyor; GPG/SSH anahtar yok → "Unverified" uyarısı. İçerik doğru, imza sorunu ortam kaynaklı.
- 4 katmanlı bellek sistemi manuel olarak kuruldu (agentmemory paket olmadan).

### Konsolide edilmeyi bekleyenler
- (şu an boş)
