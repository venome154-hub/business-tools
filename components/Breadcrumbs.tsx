"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { breadcrumbItems } from "@/lib/breadcrumbs";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = breadcrumbItems(pathname);
  if (!crumbs) return null;
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path}>
          {index > 0 && <span aria-hidden="true"> / </span>}
          {index === crumbs.length - 1 ? <span>{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
        </span>
      ))}
    </nav>
  );
}
