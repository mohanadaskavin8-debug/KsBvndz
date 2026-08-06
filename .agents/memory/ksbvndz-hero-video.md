---
name: KsBvndz hero background video
description: Hero video rules — self-hosted BLUES & GREENS clip with native autoplay; never use a YouTube iframe
---

The Hero (`artifacts/ksbvndz` → `src/components/Hero.tsx`) background is a **self-hosted native `<video muted loop playsInline>`**.

## Never a YouTube iframe
- **Bot-check:** YouTube intermittently serves a "Sign in to confirm you're not a bot" challenge *through* muted autoplay embeds, rendering on top of the hero. Nothing on the embed URL prevents it.
- **Mobile autoplay:** iOS/Android reliably autoplay only muted `playsInline` native video.
**Why:** User saw the bot-check overlay on real mobile devices.

## Current main clip
The hero uses the user's uploaded **BLUES & GREENS official video**, self-hosted as a muted native video. The production file is trimmed from the 10-second intro onward, encoded at 1280×720 with no audio, and uses a poster frame for loading.

## Current presentation
The clip fills the viewport with `object-cover`; do not reintroduce the retired square-video/AI-ambient-smoke layering approach.
- The visible title is exactly **BLUES & GREENS**.
- The YouTube button is only an external link; it must not become the video source.
- Videos autoplay only when `useReducedMotion()` is false (`autoPlay={!reduce}`).
