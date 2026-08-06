import { defineCollection, z } from 'astro:content';

// Structure comes from folders + numeric filename prefixes (see src/lib/docs.ts):
//   src/content/docs/1-getting-started/20-install.mdx  →  /docs/getting-started/install
// `section` / `order` / `sectionOrder` are OPTIONAL overrides if you ever
// want to decouple the label/order from the file path.
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    // optional overrides
    section: z.string().optional(),
    sectionOrder: z.number().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { docs };
