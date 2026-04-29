# Cartgram Landing Page

Pixel-perfect landing page for Cartgram built with Next.js and Figma-driven section work.

## Run

```bash
rtk npm install
rtk npm run dev
```

The local dev server runs on [http://localhost:3000](http://localhost:3000).

## Build

```bash
rtk npm run build
rtk npm run lint
```

## Assets

- Local fallback/source folder: `Assets/`.
- If Figma cannot provide a required media asset, check `Assets/` first.
- If the asset is missing there too, ask the owner to add it.
- Hero video is served from `public/videos/hero-main-video.mp4`, copied from `Assets/hero-main-video.mp4`.

## Font

TT Firs Neue Trial is prepared as `woff2` in `public/fonts/TTFirsNeueTrl/`.

## Progress

- [x] RTK installed and configured for Codex
- [x] Phase 0 setup
- [x] Header first iteration
- [x] Hero first iteration
- [x] Hero video connected from local Assets
- [ ] How It Works
- [ ] Features
- [ ] Remaining desktop sections
- [ ] Responsive 1440 / 390 / 768
- [ ] ContactModal + Formspree
- [ ] Final polish / Safari / deploy

## Notes

- The project is local-only for now.
- GitHub and hosting are intentionally deferred until the full landing page is ready.
- ContactModal and Formspree are lower priority and will be implemented later.
