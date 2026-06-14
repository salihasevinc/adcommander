# Bağlam — Projenin Şu Anki Durumu

> En sık değişen dosya. Her anlamlı ilerlemede güncelle.
> Son güncelleme: 2026-06-14

## Aşama
- **Greenfield** — uygulama kodu **henüz yok**. Repo yalnızca döküman içeriyor.
- Mevcut dosyalar: `CLAUDE.md`, `intent.md`, `DESIGN.md`, `.memory/`.

## Önemli boşluklar / dikkat
- ⚠️ `CLAUDE.md` ve `intent.md` `@plan.md`'ye atıf yapıyor ama **`plan.md` henüz yok**.
  v1 yol haritası (mimari, modüller, fazlar) yazılmayı bekliyor. Yeni iş bir faza
  bağlanmadan başlayamaz — bu yüzden bir sonraki doğal adım `plan.md`'yi oluşturmak.
- Build/test komutları **TBD** — iskelet kurulunca CLAUDE.md gerçek komutlarla güncellenecek.
  Beklenenler: `npm install`, `npm run dev`, `npm test`, `npm run lint`, `npm run typecheck`,
  `npx prisma migrate dev` (kurulunca doğrula, uydurma).

## Beklenen dizin düzeni (iskelet kurulunca)
- `app/` (Next.js App Router — web + API), `lib/` (domain mantığı),
  `prisma/` (şema + migration), `components/` (UI).

## Henüz alınmamış kararlar (TBD)
- Arka plan **kuyruğu** sağlayıcısı (uzun/rate-limit'li işler: üretim, deploy, günlük metrik).
- Görsel üretimi için kullanılacak hazır harici API.
