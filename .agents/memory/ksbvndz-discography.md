---
name: KsBvndz discography data source
description: How to source real cover art, titles, and release dates when editing the KsBvndz site's song list
---

The discography (`artifacts/ksbvndz` → `src/components/Music.tsx`) uses REAL Apple Music metadata, never fabricated data.

To add/verify songs:
- Fetch `https://itunes.apple.com/lookup?id=1745377739&entity=song&limit=200&country=US` (Apple Music artist id `1745377739`). Each track row has `trackName`, `releaseDate`, and `artworkUrl100`.
- Get full-res cover art by replacing `100x100bb.jpg` with `600x600bb.jpg` in the artwork URL.
- Save covers to `attached_assets/covers/<slug>.jpg` (aliased `@assets/covers/...`), then `import` them in Music.tsx.
- Keep the `tracks` array sorted newest → oldest by date; a few entries are `featured: true` (larger grid tiles) — keep ~3 spread through the list for visual rhythm.
- Use Apple's official spelling (e.g. "Car Dink", not the censored form a user may type in chat). Spotify artist id in-code: `2DhpGOseQQqPEbYr9mBiwe`.
- The official *Silence Feels Louder* album collection is `6781061654`. Fetch its 20 tracks and preview URLs with `https://itunes.apple.com/lookup?id=6781061654&entity=song&limit=200`.
- Album-row playback uses Apple's public 30-second previews converted from AAC/M4A to MP3 and stored locally in numbered album order. Do not substitute fabricated audio or full-song downloads.

**Why:** The site owner wants a truthful discography with real artwork and reliable browser playback; fabricated stats/covers were explicitly rejected before, and remote embeds were less reliable than local preview files.
**How to apply:** Resolve song metadata and previews from the Apple lookups rather than inventing them. For album preview changes, preserve numbered order, convert only Apple's public preview clips to MP3, and check `Timeline.tsx` for milestones that can go stale.
