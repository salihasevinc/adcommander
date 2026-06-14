# memory/episodic.md — Epizodik Bellek

> **Katman 2 — Epizodik:** "Ne oldu" kaydı. Tamamlanan fazlar, önemli oturumlar,
> alınan kararlar ve çözülen sorunlar. Kronolojik; yeni olay eklenince büyür.
> Eski/önemsiz epizotlar semantik katmana sindirildikten sonra budanır.

---

## Epizot 001 — Genesis oturumu (14.06.2026)

**Yapılanlar:**
- `intent.md` incelendi ve derinlemesine analiz edildi
- Birincil kullanıcı = küçük/orta ajanslar olarak sabitlendi (intent placeholder güncellendi)
- `plan.md` oluşturuldu: intent'ten türeyen v1 yol haritası (mimari, 6 modül, F0–F5 faz planı)
- `CLAUDE.md` oluşturuldu: Anthropic best-practice'lerine göre; `@intent.md` / `@plan.md` / `@design.md` import
- `design.md` (Command Deck) incelendi ve repoya taşındı
- `memory/` 4 katmanlı bellek sistemi kuruldu

**Kararlar:**
- Tech stack: Next.js + TS, PostgreSQL + Prisma, Auth.js, Stripe, Claude `claude-sonnet-4-6`
- Kampanyalar PAUSED başlar (güvenlik)
- Tasarım kimliği: "Command Deck" — mission control estetiği

**Açık kalan:**
- Push yetkisi (403) çözülmedi — dosyalar yerelde commit'li
- `agentmemory` paketi kurulamadı (güvenlik sınıflandırıcı engeli); 4 katmanlı yapı manuel kuruldu
- Görsel API sağlayıcısı, kuyruk teknolojisi, hosting TBD

**Sonraki adım:** F0 — repo scaffold (Next.js + TS + Prisma + Auth.js iskeleti)
