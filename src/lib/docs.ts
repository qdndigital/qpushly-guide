import { getCollection, type CollectionEntry } from 'astro:content';

/** Strip a leading numeric order prefix: "20-install" → "install". */
const strip = (s: string) => s.replace(/^\d+[-_.]/, '');
/** Parse the leading number for ordering: "20-install" → 20. */
const numOf = (s: string) => {
  const m = s.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 9999;
};
const titleCase = (s: string) =>
  s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export type DocInfo = {
  entry: CollectionEntry<'docs'>;
  url: string;          // "/docs/getting-started/install"  (prefixes stripped)
  slugParam: string;    // "getting-started/install"
  sectionSlug: string;  // "getting-started"
  sectionLabel: string; // "Getting started"
  sectionOrder: number;
  order: number;
};

/** All docs, parsed from folder + numeric prefixes, sorted for reading. */
export async function loadDocs(): Promise<DocInfo[]> {
  const all = await getCollection('docs', ({ data }) => !data.draft);
  const infos: DocInfo[] = all.map((entry) => {
    const parts = entry.slug.split('/');            // ["1-getting-started","20-install"]
    const slugParam = parts.map(strip).join('/');   // "getting-started/install"
    const fileSeg = parts[parts.length - 1];
    const order = entry.data.order ?? numOf(fileSeg);

    let sectionSlug = '';
    let sectionLabel = entry.data.section ?? 'General';
    let sectionOrder = entry.data.sectionOrder ?? 9999;
    if (parts.length > 1) {
      const folder = parts[0];
      sectionSlug = strip(folder);
      sectionLabel = entry.data.section ?? titleCase(sectionSlug);
      sectionOrder = entry.data.sectionOrder ?? numOf(folder);
    }
    return { entry, url: `/docs/${slugParam}`, slugParam, sectionSlug, sectionLabel, sectionOrder, order };
  });

  infos.sort(
    (a, b) => a.sectionOrder - b.sectionOrder || a.order - b.order || a.slugParam.localeCompare(b.slugParam)
  );
  return infos;
}

export type DocGroup = { label: string; slug: string; order: number; items: DocInfo[] };

/** Group docs by section (folder), preserving order. */
export function groupDocs(infos: DocInfo[]): DocGroup[] {
  const groups: DocGroup[] = [];
  for (const d of infos) {
    let g = groups.find((x) => x.slug === d.sectionSlug && x.label === d.sectionLabel);
    if (!g) {
      g = { label: d.sectionLabel, slug: d.sectionSlug, order: d.sectionOrder, items: [] };
      groups.push(g);
    }
    g.items.push(d);
  }
  groups.sort((a, b) => a.order - b.order);
  return groups;
}
