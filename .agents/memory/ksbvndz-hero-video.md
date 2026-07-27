---
name: KsBvndz hero background video
description: Hero video rules — never YouTube iframe; lossless user clip; widescreen via AI ambient smoke layer, not outpainting
---

The Hero (`artifacts/ksbvndz` → `src/components/Hero.tsx`) background is a **self-hosted native `<video muted loop playsInline>`**.

## Never a YouTube iframe
- **Bot-check:** YouTube intermittently serves a "Sign in to confirm you're not a bot" challenge *through* muted autoplay embeds, rendering on top of the hero. Nothing on the embed URL prevents it.
- **Mobile autoplay:** iOS/Android reliably autoplay only muted `playsInline` native video.
**Why:** User saw the bot-check overlay on real mobile devices.

## Current main clip
`attached_assets/hero-bg.mp4` is the **user-uploaded album trailer** (1:1 square, ~28s), stored as a **lossless stream copy** (`ffmpeg -an -c:v copy`). **Why:** user complained about visible quality loss from re-encodes — never re-encode this clip, only strip audio. Poster: `hero-poster.jpg`.

## Widescreen "extension" = ambient AI layer, not outpainting
The square clip is made to read as full-width by an **independent AI-generated smoke loop** (`attached_assets/hero-ambient.mp4`) behind it, plus a CSS mask fading the square's outer ~6% into it (two linear-gradients + `mask-composite: intersect`, with `-webkit` fallbacks).
- **Why:** No video-outpainting tool exists here (`generateVideo` is text-to-video only, ≤8s), and the trailer's edges are abstract dark smoke — a matching ambient layer blends invisibly (verified via offline ImageMagick composites).
- Layers are independent — **no playback sync needed**; don't reintroduce a `timeupdate` sync effect.
- Regen recipe: `generateVideo` (dark smoke, dusty-rose/mauve tint, black bg, "no text/people"); the model adds film-strip borders/sprocket holes — **crop them off**; make it loop with a palindrome (`split`,`reverse`,`concat`); 720p is enough because it renders at `brightness(0.7)` behind the artwork.
- Videos autoplay only when `useReducedMotion()` is false (`autoPlay={!reduce}`).
