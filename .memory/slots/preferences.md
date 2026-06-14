# Tercihler — Kullanıcı & Proje

- **İletişim dili:** Türkçe (dökümanlar ve sohbet). Kod/identifier İngilizce.
- **Commit:** Açıklayıcı mesaj; bir fazın işi tek mantıksal commit'te.
- **Branch:** Geliştirme doğrudan **`main`** üzerinde (sahip kararı, 14.06.2026).
- **PR:** Yalnızca açıkça istenince açılır.
- **Kod standardı:** TypeScript **strict**, `any`'den kaçın; ESLint + Prettier;
  commit öncesi lint + typecheck temiz olmalı.
- **Model:** Metin üretimi için Anthropic Claude, varsayılan `claude-sonnet-4-6`.
- **Sırlar:** `.env` ile; örnekler `.env.example`. `.env` asla commit'lenmez.
