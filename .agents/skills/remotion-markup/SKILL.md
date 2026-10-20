---
name: remotion-markup
description: Content, animation, and effects best practices for Remotion React markup
version: 4.0.537
---

# Remotion React Markup Best Practices

Guidance for writing Remotion React Markup and motion graphics components.

## General Rules

1. **Calculate Timing with `fps`**:
   Inside a composition or scene component, always retrieve `fps` from `useVideoConfig()` for all seconds-to-frames calculations (`durationInFrames`, delays, sequence lengths).
   Example: `durationInFrames={5 * fps}`.

2. **Deterministic Frame-Driven Animations**:
   - Drive animations using `useCurrentFrame()`, `spring()`, and `interpolate()`.
   - Never use CSS `@keyframes`, CSS `transition`, or CSS `animation` (they cause flickering in multi-threaded headless rendering).
   - Never use non-deterministic `Math.random()` during render; use deterministic pseudo-random functions seeded by index or frame.

3. **Inline Editable Keyframes & Easing**:
   - Use `Easing.bezier()` or Remotion's native `spring()` with `mass`, `damping`, and `stiffness`.
   - Prefer `scale`, `translate`, and `rotate` CSS properties over complex `transform` strings.
   - When animating `scale`, use `output: 'perceptual-scale'`.

4. **Media and Static Assets**:
   - Place assets in `public/` and reference them with `staticFile('asset.png')`.
   - Use `<Video>` and `<Audio>` from `@remotion/media` for synchronized playback.

5. **Multi-Scene Sequencing**:
   - Use `<Series>` and `<Series.Sequence durationInFrames={...}>` to chain scenes cleanly.
   - Keep shared branding and persistent overlays in an `<AbsoluteFill>` above the `<Series>`.
