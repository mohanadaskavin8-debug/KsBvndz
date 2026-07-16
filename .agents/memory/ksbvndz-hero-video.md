---
name: KsBvndz hero background video
description: Why the hero background is a self-hosted native <video>, not a YouTube iframe
---

The Hero (`artifacts/ksbvndz` → `src/components/Hero.tsx`) background is a **self-hosted native `<video muted loop playsInline autoPlay>`**, sourced from the "Black Sheep" official video (YouTube id `uvw-8HFJCag`).

Do NOT switch it back to a YouTube iframe embed. Two reasons:
- **Bot-check:** YouTube intermittently serves a "Sign in to confirm you're not a bot" challenge *through* muted autoplay embeds, which then renders on top of the hero. Nothing on the embed URL prevents it.
- **Mobile autoplay:** iOS/Android reliably autoplay only muted, `playsInline` native video — YouTube iframe autoplay is flaky on mobile.

Assets live in `attached_assets/` (imported via `@assets/...`): `hero-bg.mp4` (~11MB, 540p, audio stripped) and `hero-poster.jpg`. To regenerate: `uvx yt-dlp` the video, then `ffmpeg -an -vf scale=-2:540 -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart`. A muted native video always needs `muted` + `playsInline` for mobile autoplay.

**Why:** User reported the bot-check overlay appearing in the hero background on real mobile devices.
