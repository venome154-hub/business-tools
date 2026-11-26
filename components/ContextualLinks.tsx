import Link from "next/link";
import { linksFor, type RelatedLink } from "@/lib/related";

function Group({ title, links }: { title: string; links: RelatedLink[] }) {
  if (links.length === 0) return null;
  return (
    <div>
      <strong>{title}</strong>
      {links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
    </div>
  );
}

export default function ContextualLinks({ path }: { path: string }) {
  const links = linksFor(path);
  if (!links) return null;
  if (links.guides.length + links.tools.length + links.templates.length + links.moreCsv.length === 0) return null;
  return (
    <aside className="related-links" aria-label="Related">
      <Group title="Related guides" links={links.guides} />
      <Group title="Related tools" links={links.tools} />
      <Group title="Related templates" links={links.templates} />
      <Group title="More CSV tools" links={links.moreCsv} />
    </aside>
  );
}
