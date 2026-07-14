---
name: Lenis smooth scroll
description: Gotchas for adding Lenis momentum/smooth scrolling in the react-vite artifacts — the invalid-hook-call crash and broken hash-anchor navigation.
---

# Lenis smooth scroll

Use the maintained `lenis` package directly. Instantiate `new Lenis(...)` in a `useEffect`, drive it with a `requestAnimationFrame` loop, and clean up with BOTH `cancelAnimationFrame(rafId)` and `lenis.destroy()` on unmount (a bare self-recursive RAF loop leaks and stacks duplicate loops across HMR remounts).

**Why:** The deprecated `@studio-freight/react-lenis` wrapper pulls its own React and, installed alongside `lenis`, causes a duplicate-React "Invalid hook call" crash (`null is not an object (evaluating 'resolveDispatcher().useRef')`). Use native `lenis` to avoid it.

**How to apply:** When asked for smooth/momentum scrolling in a react-vite artifact, add only `lenis` (never `@studio-freight/react-lenis`). Wrap the app in a small component whose `useEffect` starts the RAF loop and destroys Lenis + cancels the RAF on cleanup.

## In-page anchor links don't scroll under Lenis

Once Lenis is running, native `<a href="#section">` clicks stop working: the URL hash updates but the page stays put (`scrollY` stuck at 0). Lenis's rAF loop keeps rendering its own tracked scroll position and overrides the browser's instant hash jump.

**Fix:** Add a delegated `click` listener (in the same component that owns the Lenis instance) that catches `a[href^="#"]`, `preventDefault()`s, and calls `lenis.scrollTo(href, { offset: -<navHeight> })` (use `lenis.scrollTo(0)` for a bare `#`). One document-level listener fixes every in-page anchor at once (desktop nav, mobile menu, logo) without prop-drilling the instance. `lenis` ≥ 1.1.13 also supports an `anchors: true | ScrollToOptions` constructor option as an alternative.

**Why:** Symptom seen in QA — tapping a nav link only changed the hash while the viewport stayed on the hero. The offset accounts for a fixed/sticky navbar so the target heading isn't hidden underneath it.

## Buttery scroll = remove jank sources, not just tune Lenis

Two non-obvious things wreck Lenis smoothness independently of its config:
- A full-screen `position: fixed` overlay with `mix-blend-mode` (e.g. a film-grain layer) forces the browser to re-composite/re-blend the whole viewport on every scroll frame. Drop the blend mode (use plain low `opacity`) — it was the single biggest stutter source here.
- Native CSS `html { scroll-behavior: smooth }` fights Lenis's JS-driven smoothing. Set it to `auto` and add Lenis's recommended `.lenis` helper classes.

Prefer `{ lerp: ~0.1 }` (continuous glide) over `{ duration }` for the wheel; pass `duration`/`easing` per call in `lenis.scrollTo(...)` for anchors.

**Why:** User reported scrolling "not smooth"; tuning Lenis alone didn't fix it — the fixed blended grain overlay + CSS smooth-scroll were the real culprits.

## Respect prefers-reduced-motion

A JS smooth-scroll + a scroll-locking intro is an accessibility trap. Gate all of it on `window.matchMedia('(prefers-reduced-motion: reduce)').matches`: skip the intro (and its scroll lock), do NOT instantiate Lenis (fall back to native/instant anchor jumps), and collapse entrance timelines (drop blur/scale/offset, near-zero delays, no infinite loops).

