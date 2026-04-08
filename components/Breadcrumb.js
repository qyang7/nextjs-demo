"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumb } from "./BreadcrumbContext";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { customBreadcrumbs } = useBreadcrumb();

  const paths = pathname.split("/").filter(Boolean);

  const autoBreadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    const label = decodeURIComponent(path);
    const isLast = index === paths.length - 1;
    return { href, label, isLast };
  });

  const breadcrumbs = customBreadcrumbs.length > 0 ? customBreadcrumbs : autoBreadcrumbs;

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav style={{ 
      padding: '12px 16px', 
      background: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px'
    }}>
      <ol style={{ 
        display: 'flex', 
        alignItems: 'center', 
        listStyle: 'none', 
        margin: 0, 
        padding: 0,
        gap: '8px'
      }}>
        <li>
          <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
            首页
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#999' }}>/</span>
            {crumb.isLast ? (
              <span style={{ color: '#333' }}>{crumb.label}</span>
            ) : (
              <Link href={crumb.href || '#'} style={{ color: '#0070f3', textDecoration: 'none' }}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
