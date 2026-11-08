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
  homeUrl: 'https://qpushly.com',            // website link in the header
  demoLabel: 'qpushly.com',
  appStoreUrl: 'https://apps.shopify.com/qpushly',
  pricingUrl: 'https://qpushly.com/pricing',
  supportEmail: 'hello@qdn.vn',
  responseTime: 'one business day',
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

/** Qpushly symbol (brand guideline 2026-11) — the Q with its push-blue bubble and dot.
 *  Byte-for-byte the paths of qpushly/public/brand/qpushly-symbol.svg; re-copy when the brand kit changes. */
const QPUSHLY_MARK = (size: number) =>
  `<svg viewBox="-30 110 352 330" width="${size}" height="${size}" aria-hidden="true"><path fill="#1E1E1A" fill-rule="evenodd" d="M77.97 140L216.54 140A75.37 75.37 0 0 1 291.91 215.37L291.91 285.61A43.09 43.09 0 0 0 265.59 276.63L220.16 276.63L220.15 233.17A28.76 28.76 0 0 0 191.4 204.42L97.4 204.42A25.64 25.64 0 0 0 71.76 230.05L71.76 311.73A25.25 25.25 0 0 0 97.01 336.98L153.14 336.98L153.14 373.67A43.09 43.09 0 0 0 162.12 400L74.33 400A74.33 74.33 0 0 1 0 325.67L0 217.97A77.97 77.97 0 0 1 77.97 140Z"/><path fill="#2F6FED" d="M196.23 293.40H265.59A26.33 26.33 0 0 1 291.91 319.72V373.68A26.33 26.33 0 0 1 265.59 400.00H238L208 428V400H196.23A26.33 26.33 0 0 1 169.91 373.68V319.72A26.33 26.33 0 0 1 196.23 293.40Z"/><circle cx="267.5" cy="321.1" r="13.4" fill="#F4F1EA"/></svg>`;

/** QPushly lockup (Q + "Pushly", the "chữ thường" version) — same as the marketing site.
 *  Byte-for-byte the LIGHT paths of qpushly-web/src/components/Logo.astro; re-copy when the brand kit changes.
 *  The viewBox includes the bubble tail + 0.11H safe area, so size by height only. */
const QPUSHLY_LOCKUP = (height: number) =>
  `<svg class="lockup" viewBox="-30 110 1352 371" height="${height}" width="${Math.round(height * 1352 / 371)}" role="img" aria-label="QPushly"><path fill="#1E1E1A" fill-rule="evenodd" d="M77.97 140L216.54 140A75.37 75.37 0 0 1 291.91 215.37L291.91 285.61A43.09 43.09 0 0 0 265.59 276.63L220.16 276.63L220.15 233.17A28.76 28.76 0 0 0 191.4 204.42L97.4 204.42A25.64 25.64 0 0 0 71.76 230.05L71.76 311.73A25.25 25.25 0 0 0 97.01 336.98L153.14 336.98L153.14 373.67A43.09 43.09 0 0 0 162.12 400L74.33 400A74.33 74.33 0 0 1 0 325.67L0 217.97A77.97 77.97 0 0 1 77.97 140Z"/><path fill="#2F6FED" d="M196.23 293.40H265.59A26.33 26.33 0 0 1 291.91 319.72V373.68A26.33 26.33 0 0 1 265.59 400.00H238L208 428V400H196.23A26.33 26.33 0 0 1 169.91 373.68V319.72A26.33 26.33 0 0 1 196.23 293.40Z"/><circle cx="267.5" cy="321.1" r="13.4" fill="#F4F1EA"/><path fill="#1E1E1A" d="M411.9579439252337 327.87179487179486H381.74299065420564V388.0H333.0V220.5H411.9579439252337Q435.9018691588785 220.5 452.43457943925233 227.41951566951568Q468.96728971962614 234.33903133903135 477.23364485981307 246.5078347578348Q485.5 258.6766381766382 485.5 274.42450142450144Q485.5 288.97934472934475 477.51869158878503 301.0288461538462Q469.53738317757006 313.0783475783476 453.00467289719626 320.47507122507125Q436.47196261682245 327.87179487179486 411.9579439252337 327.87179487179486ZM435.9018691588785 274.42450142450144Q435.9018691588785 264.4031339031339 429.0607476635514 258.91524216524215Q422.2196261682243 253.42735042735043 408.25233644859816 253.42735042735043H381.74299065420564V295.4216524216524H408.25233644859816Q422.2196261682243 295.4216524216524 429.0607476635514 289.9337606837607Q435.9018691588785 284.44586894586894 435.9018691588785 274.42450142450144Z M666.2168224299065 254.85897435897436V388.0H617.4738317757009V369.8660968660969Q610.0626168224298 378.69444444444446 597.3780373831776 384.0630341880342Q584.6934579439252 389.4316239316239 569.3009345794393 389.4316239316239Q551.0579439252336 389.4316239316239 537.0906542056075 382.6314102564103Q523.1233644859813 375.8311965811966 515.4271028037383 362.9465811965812Q507.7308411214953 350.0619658119658 507.7308411214953 332.64387464387465V254.85897435897436H556.188785046729V327.1559829059829Q556.188785046729 340.5178062678063 564.455140186916 347.9145299145299Q572.7214953271028 355.3112535612536 586.688785046729 355.3112535612536Q600.9411214953271 355.3112535612536 609.207476635514 347.9145299145299Q617.4738317757009 340.5178062678063 617.4738317757009 327.1559829059829V254.85897435897436Z M691.0130841121495 344.3354700854701H739.1859813084111Q740.041121495327 351.25498575498574 746.8822429906542 355.5498575498575Q753.7233644859813 359.84472934472933 763.6999999999999 359.84472934472933Q772.8214953271028 359.84472934472933 777.8098130841121 356.86217948717945Q782.7981308411214 353.8796296296296 782.7981308411214 349.1075498575499Q782.7981308411214 343.38105413105416 775.6719626168224 340.6371082621083Q768.5457943925232 337.8931623931624 752.5831775700934 334.5527065527066Q735.4803738317756 331.2122507122507 724.0785046728971 327.5138888888889Q712.6766355140186 323.8155270655271 704.4102803738317 315.8222934472934Q696.1439252336448 307.8290598290598 696.1439252336448 294.22863247863245Q696.1439252336448 282.775641025641 703.6976635514018 273.3507834757835Q711.2514018691588 263.9259259259259 725.9313084112149 258.4380341880342Q740.611214953271 252.95014245014247 760.8495327102803 252.95014245014247Q790.7794392523364 252.95014245014247 808.0247663551402 265.3575498575499Q825.2700934579439 277.7649572649573 827.8355140186916 298.2849002849003H782.7981308411214Q781.6579439252336 291.36538461538464 775.5294392523364 287.30911680911686Q769.4009345794392 283.252849002849 759.4242990654205 283.252849002849Q750.8728971962616 283.252849002849 746.3121495327102 285.9967948717949Q741.7514018691588 288.74074074074076 741.7514018691588 293.5128205128205Q741.7514018691588 299.2393162393162 749.0200934579439 302.1025641025641Q756.2887850467289 304.96581196581195 771.6813084112149 307.8290598290598Q789.3542056074766 311.6467236467237 800.4710280373831 315.34508547008545Q811.5878504672896 319.0434472934473 819.9967289719625 327.2752849002849Q828.4056074766354 335.5071225071225 828.6906542056074 349.34615384615387Q828.6906542056074 361.0377492877493 820.8518691588785 370.2240028490029Q813.0130841121495 379.4102564102564 798.3331775700934 384.65954415954417Q783.6532710280374 389.9088319088319 764.2700934579439 389.9088319088319Q743.4616822429906 389.9088319088319 727.2140186915888 383.9437321937322Q710.9663551401868 377.9786324786325 701.5598130841121 367.599358974359Q692.1532710280374 357.22008547008545 691.0130841121495 344.3354700854701Z M1015.1084112149531 310.2150997150997V388.0H966.6504672897195V315.70299145299145Q966.6504672897195 302.34116809116813 958.3841121495326 294.94444444444446Q950.1177570093457 287.5477207977208 936.1504672897195 287.5477207977208Q922.1831775700933 287.5477207977208 913.9168224299065 294.94444444444446Q905.6504672897195 302.34116809116813 905.6504672897195 315.70299145299145V388.0H856.907476635514V211.43304843304844H905.6504672897195V272.7542735042735Q913.0616822429905 263.9259259259259 925.8887850467288 258.67663817663816Q938.7158878504672 253.42735042735043 954.6785046728971 253.42735042735043Q982.0429906542055 253.42735042735043 998.5757009345793 268.5787037037037Q1015.1084112149531 283.730056980057 1015.1084112149531 310.2150997150997Z M1096.0588785046727 211.43304843304844V388.0H1047.315887850467V211.43304843304844Z M1292.168224299065 254.85897435897436 1192.4018691588783 451.230056980057H1139.953271028037L1176.4392523364484 383.4665242165242L1111.7336448598128 254.85897435897436H1166.1775700934577L1202.9485981308408 338.1317663817664L1239.434579439252 254.85897435897436Z"/></svg>`;

/** Full logo (symbol + wordmark) for header/footer. Qpushly uses the lockup; other presets fall back to mark + name. */
export function wordmark(height = 32): string | null {
  return site.preset === "qpushly" ? QPUSHLY_LOCKUP(height) : null;
}

/** Logo mark for a given pixel size. Qpushly uses its own symbol; the other QDN-family presets keep frame + glyph. */
export function logo(size = 28, frame = '#101317'): string {
  if (site.preset === 'qpushly') return QPUSHLY_MARK(size);
  const t = theme();
  return `<svg viewBox="0 0 32 32" width="${size}" height="${size}" fill="none" aria-hidden="true"><rect x="2.5" y="2.5" width="27" height="27" rx="7" stroke="${frame}" stroke-width="2"/>${GLYPHS[t.glyph](t.accent)}</svg>`;
}
