"use client";

import { useEffect } from "react";
import { useBreadcrumb } from "./BreadcrumbContext";

export default function SetBreadcrumb({ items }) {
  const { setCustomBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    if (items && Array.isArray(items)) {
      setCustomBreadcrumbs(items);
    }
    return () => setCustomBreadcrumbs([]);
  }, [items, setCustomBreadcrumbs]);

  return null;
}
