/**
 * Qpushly Guide — "Polaris Pro" design tokens, shared with the Qpushly site.
 * White ground, cool grays, accent driven by CSS vars from src/config.ts, Inter,
 * light borders, minimal shadow. Token names kept (`paper`, `surface`…)
 * so existing utility classes reskin from just src/config.ts.
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        'paper-2': '#f6f7f8',
        surface: '#ffffff',
        ink: '#101317',
        'ink-2': '#41464d',
        muted: '#697079',
        faint: '#9aa0a8',
        line: '#e6e7ea',
        'line-2': '#d3d6da',
        // Driven by CSS vars so the whole guide reskins from src/config.ts
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          ink: 'var(--accent-ink)',
          line: 'var(--accent-line)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        h1: ['clamp(1.9rem, 3.4vw, 2.6rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
      },
      letterSpacing: { tight2: '-0.02em' },
      maxWidth: { wrap: '1240px', prose: '46rem' },
      borderRadius: { lg2: '0.625rem', xl2: '0.875rem' },
      boxShadow: {
        xs: '0 1px 2px rgba(16,24,40,.05)',
        sm: '0 1px 2px rgba(16,24,40,.06), 0 1px 1px rgba(16,24,40,.04)',
        float: '0 1px 1px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.18), 0 40px 80px -36px rgba(16,24,40,.22)',
      },
    },
  },
  plugins: [],
};
