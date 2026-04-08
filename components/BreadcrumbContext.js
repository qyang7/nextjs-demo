"use client";

import { createContext, useContext, useState } from "react";
import Breadcrumb from "./Breadcrumb";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const [customBreadcrumbs, setCustomBreadcrumbs] = useState([]);

  return (
    <BreadcrumbContext.Provider value={{ customBreadcrumbs, setCustomBreadcrumbs }}>
      <Breadcrumb />
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within BreadcrumbProvider");
  }
  return context;
}
