/* =====================================================================
   GUIDE CONFIG — the ONE file to style this guide for a given app.
   Change `preset` to one of the QDN-family apps and the whole guide
   reskins (accent colour + logo glyph + name). Or set custom overrides.
   ===================================================================== */

export type Glyph = 'square' | 'stack' | 'signal' | 'rosette';

/** SVG inner shapes for each app's mark (frame is added by the logo). */
export const GLYPHS: Record<Glyph, (c: string) => string> = {
  square: (c) => `<rect x="11" y="11" width="10" height="10" rx="2.5" fill="${c}"/>`,
  stack: (c) =>
    `<rect x="13.25" y="7.6" width="5.5" height="5.5" rx="1.5" fill="${c}"/><rect x="13.25" y="13.75" width="5.5" height="5.5" rx="1.5" fill="${c}" fill-opacity="0.55"/><rect x="13.25" y="19.9" width="5.5" height="5.5" rx="1.5" fill="${c}" fill-opacity="0.28"/>`,
  signal: (c) =>
    `<rect x="9.2" y="17.2" width="5.6" height="5.6" rx="1.5" fill="${c}"/><path d="M12 14 A6 6 0 0 1 18 20" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/><path d="M12 10.5 A9.5 9.5 0 0 1 21.5 20" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`,
  rosette: (c) =>
    `<rect x="10.3" y="10.3" width="11.4" height="11.4" rx="1.6" fill="${c}"/><rect x="10.3" y="10.3" width="11.4" height="11.4" rx="1.6" fill="${c}" transform="rotate(45 16 16)"/>`,
};

export type Preset = {
  brand: string;        // wordmark, e.g. "QSortby"
  accent: string;       // main accent (fills, borders)
  accentInk: string;    // darker accent for text on light (AA)
  accentSoft: string;   // tint for pills / active nav
  /** Border tint — between `accent` and `accentSoft`. Used for card/pill borders.
   *  Previously hardcoded to QSortby's green (#cbe8da) in a few places, which
   *  meant a reskinned guide kept green borders. */
  accentLine: string;
  /** `r,g,b` of `accent`, for the rgba() glows and aurora gradients. Same story:
   *  those were hardcoded to `0,163,107`. */
  accentRgb: string;
  glyph: Glyph;
};

/** The QDN family — reuse the exact brand marks + colours. */
export const PRESETS: Record<string, Preset> = {
  qdn:     { brand: 'QDN',     accent: '#e2622a', accentInk: '#ab4715', accentSoft: '#f7e4d8', accentLine: '#f0cdb8', accentRgb: '226,98,42',  glyph: 'square' },
  // QSortby — matches the marketing site's "Polaris Pro" Shopify-green accent.
  qsortby: { brand: 'QSortby', accent: '#00a36b', accentInk: '#067a55', accentSoft: '#e9f6f0', accentLine: '#cbe8da', accentRgb: '0,163,107',  glyph: 'stack' },
  // Qpushly — matches qpushly-web's blue accent (tailwind.config.mjs → blue.*).
  qpushly: { brand: 'Qpushly', accent: '#2f6fed', accentInk: '#1e4fbf', accentSoft: '#eaf0fe', accentLine: '#c9d9fb', accentRgb: '47,111,237', glyph: 'signal' },
  qmember: { brand: 'QMember', accent: '#7c5cff', accentInk: '#5b3fd6', accentSoft: '#e7e1ff', accentLine: '#d3c9ff', accentRgb: '124,92,255', glyph: 'rosette' },
};

/* ------------------------------------------------------------------ */
/*  EDIT HERE to spin up a guide for another app.                     */
/* ------------------------------------------------------------------ */
export const site = {
  preset: 'qpushly' as keyof typeof PRESETS, // ← the app this guide is for
  guideLabel: 'Guide',                       // tag next to the wordmark
  tagline:
    'Set up web push, switch on the automations, and read the numbers — every screen in Qpushly, explained.',
  homeUrl: 'https://qpushly.com',            // "back to site" link
  // Optional overrides (uncomment to customise a preset):
  // brand: 'My App',
  // accent: '#123456', accentInk: '#0a1a2e', accentSoft: '#dbe7f5',
  // accentLine: '#c9d9fb', accentRgb: '47,111,237',
  // glyph: 'square' as Glyph,
} as Record<string, any>;

/** Resolved theme = preset + any overrides in `site`. */
export function theme(): Preset {
  const base = PRESETS[site.preset] ?? PRESETS.qdn;
  return {
    brand: site.brand ?? base.brand,
    accent: site.accent ?? base.accent,
    accentInk: site.accentInk ?? base.accentInk,
    accentSoft: site.accentSoft ?? base.accentSoft,
    accentLine: site.accentLine ?? base.accentLine,
    accentRgb: site.accentRgb ?? base.accentRgb,
    glyph: (site.glyph ?? base.glyph) as Glyph,
  };
}

/** Qpushly's real brand symbol (rounded "Q" + blue notification chip), from the app's brand
 *  kit (qpushly/public/brand/qpushly-symbol.svg). Used instead of the generic framed glyph. */
const QPUSHLY_MARK = (size: number) =>
  `<svg viewBox="0 140 292 260" width="${size}" height="${Math.round((size * 260) / 292)}" aria-hidden="true"><path fill="#1E1E1A" fill-rule="evenodd" d="M77.97 140L216.54 140A75.37 75.37 0 0 1 291.91 215.37L291.91 285.61A43.09 43.09 0 0 0 265.59 276.63L220.16 276.63L220.15 233.17A28.76 28.76 0 0 0 191.4 204.42L97.4 204.42A25.64 25.64 0 0 0 71.76 230.05L71.76 311.73A25.25 25.25 0 0 0 97.01 336.98L153.14 336.98L153.14 373.67A43.09 43.09 0 0 0 162.12 400L74.33 400A74.33 74.33 0 0 1 0 325.67L0 217.97A77.97 77.97 0 0 1 77.97 140Z"/><path fill="#2F6FED" d="M196.23 293.40H265.59A26.33 26.33 0 0 1 291.91 319.72V373.68A26.33 26.33 0 0 1 265.59 400.00H196.23A26.33 26.33 0 0 1 169.91 373.68V319.72A26.33 26.33 0 0 1 196.23 293.40Z"/><circle cx="267.5" cy="321.1" r="13.4" fill="#F4F1EA"/></svg>`;

/** Full logo SVG for a given pixel size: the real Qpushly mark for the qpushly preset
 *  (unless a glyph override is set), otherwise the generic frame + glyph. */
export function logo(size = 28, frame = '#101317'): string {
  const t = theme();
  if (site.preset === 'qpushly' && !site.glyph) return QPUSHLY_MARK(size);
  return `<svg viewBox="0 0 32 32" width="${size}" height="${size}" fill="none" aria-hidden="true"><rect x="2.5" y="2.5" width="27" height="27" rx="7" stroke="${frame}" stroke-width="2"/>${GLYPHS[t.glyph](t.accent)}</svg>`;
}
