---
name: KsBvndz hero background video
description: Hero video rules — self-hosted smoke animation with native autoplay; never use a YouTube iframe
---

The Hero (`artifacts/ksbvndz` → `src/components/Hero.tsx`) background is a **self-hosted native `<video muted loop playsInline>`**.

## Never a YouTube iframe
- **Bot-check:** YouTube intermittently serves a "Sign in to confirm you're not a bot" challenge *through* muted autoplay embeds, rendering on top of the hero. Nothing on the embed URL prevents it.
- **Mobile autoplay:** iOS/Android reliably autoplay only muted `playsInline` native video.
**Why:** User saw the bot-check overlay on real mobile devices.

## Current main clip
The hero uses the original smoke treatment: a muted ambient smoke loop fills the viewport while the sharper user-uploaded square hero clip plays centered above it with feathered edges. Both are self-hosted native videos and use the original poster frame for loading.

## Current presentation
- The visible release title is exactly **BLUES & GREENS**.
- The title fades/scales in response to scroll; keep the smoke and centered-video layers independent.
- The YouTube button is only an external link; it must not become the video source.
- Videos autoplay only when `useReducedMotion()` is false (`autoPlay={!reduce}`).
